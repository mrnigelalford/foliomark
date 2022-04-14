import { MichelsonMap, TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { NetworkType, PermissionScope, DAppClient } from '@airgap/beacon-sdk';
import { Subject } from 'rxjs';
import { NFT } from '../types/NFT.types';

import { code, getStorage } from './single_nft_smartcontract';
import { castToBigNumber } from '@taquito/rpc';

const scopes: PermissionScope[] = [
  PermissionScope.OPERATION_REQUEST,
  PermissionScope.SIGN,
];

let currentAddress;
let wallet: BeaconWallet;
const oldContract = 'KT1AKo12GNP3VF7t9z4CXi8WooLBph9EXzPN';
let contractAddress = 'KT1Bp1rpSTQQLetHRVoi2wcPn5pMuNqe9sRX'; // Hangzhounet location of the smart contract
let balance;

const walletAddress = new Subject<string>();
const activeWallet = new Subject<BeaconWallet>();
const userBalance = new Subject<number>();
const activeContractAddress = new Subject<string>();

const rpcUrl = 'https://ithacanet.ecadinfra.com';
let currentWallet;

export const TezosState = () => {
  const tezos = new TezosToolkit(rpcUrl);
  const metadata = new MichelsonMap(); // big map

  userBalance.subscribe({ next: (b) => (balance = b) });
  activeContractAddress.subscribe({ next: (c) => (contractAddress = c) });
  activeWallet.subscribe({ next: (w) => (currentWallet = w) });

  walletAddress.subscribe({
    next: (a) => (currentAddress = a),
  });

  const setTezos = async () => {
    const Tezos = new TezosToolkit(rpcUrl);

    const Wallet = new BeaconWallet({
      name: 'Portfolio Marketplace',
      preferredNetwork: NetworkType.ITHACANET,
    });

    await Wallet.client.requestPermissions({
      scopes,
      network: {
        type: NetworkType.ITHACANET,
        rpcUrl,
      },
    });

    Tezos.setWalletProvider(Wallet);

    return { Tezos, Wallet };
  };

  const setWallet = async () => {
    wallet = new BeaconWallet({
      name: 'Portfolio Marketplace',
      preferredNetwork: NetworkType.ITHACANET,
    });

    await wallet.client.requestPermissions({
      scopes,
      network: {
        type: NetworkType.ITHACANET,
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
    const { Tezos, Wallet } = await setTezos();

    const { address } = await Wallet.client.getActiveAccount();

    if (address) {
      const storage = getStorage(address);
      const contractCode = code;

      if (contractCode && storage) {
        Tezos.wallet
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
    const address = await currentWallet.client.getActiveAccount();
    const contract = await tezos.wallet.at(contractAddress);

    await address.publicKey;
    console.log('a: ', currentAddress, await address.publicKey);

    // const getIPFSData = await pinFileToIPFS(nft); await this to be true

    //TODO: START HERE -  this call is not sending out the network is timing out?
    const mint = await contract.methodsObject
      .mint({
        itokenid: 10,
        iowner: address.publicKey,
        itokenMetadata: {
          key: '',
          value:
            'ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4',
        },
        iroyalties: [{ partAccount: address.publicKey, partValue: 1000 }],
      })
      .send();

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

  const setMintOrg = async () => {
    const { Tezos, Wallet } = await setTezos();

    const { address } = await Wallet.client.getActiveAccount();
    const contract = await Tezos.wallet.at(
      'KT1Bp1rpSTQQLetHRVoi2wcPn5pMuNqe9sRX'
    );

    const tokenMetadata = MichelsonMap.fromLiteral({
      'ipfs://QmetXCVSjKM8zS7sQcRm7Zg7T9touRru8emsnt7KbPLJVx': '',
    });
    tokenMetadata.set(
      '',
      'ipfs://QmetXCVSjKM8zS7sQcRm7Zg7T9touRru8emsnt7KbPLJVx'
    );

    contract.methods
      .mint({
        itokenid: 1,
        iowner: address,
        itokenMetadata: tokenMetadata,
        iroyalties: {
          partAccount: address,
          partValue: 1000,
        },
      })
      .send()
      .then((onFulfilled) => {
        console.log('off: ', onFulfilled);
      })
      .then((hash) => {
        console.log('completed: ', hash);
      });
  };

  /*
[
        {
          itokenid: 10,
          iowner: address.publicKey,
          itokenMetadata: {
            key: '',
            value:
              'ipfs://bafkreiaz7n5zj2qvtwmqnahz7rwt5h37ywqu7znruiyhwuav3rbbxzert4',
          },
          iroyalties: [{ partAccount: address.publicKey, partValue: 1000 }],
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
    setMintOrg,
  };
};
