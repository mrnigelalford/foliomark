import { MichelsonMap, TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { NetworkType, PermissionScope, DAppClient } from '@airgap/beacon-sdk';
import { Subject } from 'rxjs';
import { NFT } from '../types/NFT.types';

import { code, getStorage } from './single_nft_smartcontract';

const scopes: PermissionScope[] = [
  PermissionScope.OPERATION_REQUEST,
  PermissionScope.SIGN,
];

let wallet: BeaconWallet;
let currentAddress;
let contractAddress = 'KT1F6TY2J9wXjDp4fi7ZdTp3g7GVBVjSwfU6'; // Hangzhounet location of the smart contract
let balance;

const walletAddress = new Subject<string>();
const activeWallet = new Subject<BeaconWallet>();
const userBalance = new Subject<number>();
const activeContractAddress = new Subject<string>();

const rpcUrl = 'https://hangzhounet.api.tez.ie';

export const TezosState = () => {
  const tezos = new TezosToolkit(rpcUrl);
  const metadata = new MichelsonMap(); // big map

  userBalance.subscribe({ next: (b) => (balance = b) });
  activeContractAddress.subscribe({ next: (c) => (contractAddress = c) });

  walletAddress.subscribe({
    next: (a) => (currentAddress = a),
  });

  const setWallet = async () => {
    wallet = new BeaconWallet({
      name: 'Portfolio Marketplace',
      preferredNetwork: NetworkType.HANGZHOUNET,
    });

    await wallet.client.requestPermissions({
      scopes,
      network: {
        type: NetworkType.HANGZHOUNET,
        rpcUrl,
      },
    });

    tezos.setWalletProvider(wallet);

    activeWallet.next(wallet);
    walletAddress.next(await wallet.getPKH());
    userBalance.next(
      (await tezos.tz.getBalance(await wallet.getPKH())).toNumber()
    );
  };

  const disconnectWallet = async (): Promise<void> => {
    wallet.client.removeAllAccounts();
    wallet.client.removeAllPeers();
    wallet.client.destroy();

    activeWallet.next();
    userBalance.next();
    walletAddress.next();
  };

  const setOriginate = async () => {
    if (!wallet) await setWallet();

    if (await wallet.client.getActiveAccount()) {
      const storage = getStorage(currentAddress);
      const contractCode = code;

      if (contractCode && storage) {
        tezos.wallet
          .originate({
            code: contractCode,
            init: storage,
          })
          .send()
          .then((originationOp) => {
            console.log(
              `Waiting for confirmation of origination...`,
              originationOp
            );
            return originationOp.contract();
          })
          .then((contract) => {
            console.log(`Origination completed for `, contract);
            activeContractAddress.next(contract.address);
          })
          .catch((error) => console.log('Error: ', error));
      }
    }
  };

  const getLocalStorage = async () => {
    const localAccount = JSON.parse(localStorage.getItem('beacon:accounts'))[0]
      .address;
    if (localAccount) {
      // console.log('local storage found', localAccount);
      walletAddress.next(localAccount);
    }
  };

  const setMint = async (nft: NFT) => {
    const address = await wallet.client.getActiveAccount();
    const contract = await tezos.wallet.at(contractAddress);
    let publicKey = address.publicKey;

    console.log('a: ', publicKey);

    // const getIPFSData = await pinFileToIPFS(nft); await this to be true
    const mint = await contract.methods.mint().send();

    const receipt = mint.receipt[0];
    return {
      message: 'Success',
      source: receipt['source'],
      fee: receipt['fee'],
      counter: receipt['counter'],
      gas_limit: receipt['gas_limit'],
      storage_limit: receipt['storage_limit'],
      amount: receipt['amount'],
      destination: receipt['destination'],
    };
  };

  /*
  [
    {
      itokenid: 1,
      iowner: publicKey,
      itokenMetadata: '',
      iroyalties: [
        {
          partAccount: publicKey,
          partValue: 5,
        },
      ],
    },
  ]

  */

  // iowner: currentAddress || 'tz1PoPDTmv1hESn5JxwLRCL8r4ye3LV21p1a',
  // itokenid: 123,
  // amount: 1,
  // itokenMetadata: `ipfs://QmetXCVSjKM8zS7sQcRm7Zg7T9touRru8emsnt7KbPLJVx`,

  // const connectNano = async (): Promise<void> => {
  //   try {
  //     const transport = await TransportU2F.create();
  //     const ledgerSigner = new LedgerSigner(transport, "44'/1729'/0'/0'", true);

  //     Tezos.setSignerProvider(ledgerSigner);

  //     //Get the public key and the public key hash from the Ledger
  //     const userAddress = await Tezos.signer.publicKeyHash();
  //     await setup(userAddress);
  //   } catch (error) {
  //     console.log('Error!', error);
  //     setLoadingNano(false);
  //   }
  // };

  return {
    activeWallet,
    setWallet,
    walletAddress,
    disconnectWallet,
    userBalance,
    setOriginate,
    getLocalStorage,
    setMint,
  };
};
