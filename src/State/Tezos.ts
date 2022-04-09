import { compose, MichelsonMap, TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { NetworkType, PermissionScope } from '@airgap/beacon-sdk';
import smartContract from './smartContract';
import { Subject } from 'rxjs';
import { NFT } from '../types/NFT.types';
import { tzip12 } from '@taquito/tzip12';
import { tzip16, char2Bytes } from '@taquito/tzip16';
import {
  token_metadata,
  token_metadata_0_token_info,
} from './Tezos/setTokenMetadata';

// const contractAddress = 'KT1AKo12GNP3VF7t9z4CXi8WooLBph9EXzPN'; // Hangzhounet location of the smart contract

const scopes: PermissionScope[] = [
  PermissionScope.OPERATION_REQUEST,
  PermissionScope.SIGN,
];

let wallet: BeaconWallet;

const walletAddress = new Subject<string>();
const activeWallet = new Subject<BeaconWallet>();
const userBalance = new Subject<number>();
const activeContractAddress = new Subject<string>();

const rpcUrl = 'https://hangzhounet.api.tez.ie';

const tezos = new TezosToolkit(rpcUrl);

// TODO: can we make origination be cheaper (0.755 ꜩ fee)
// objkt comparison: https://tzkt.io/tz2APwAAPFedmMHAAEvgw6rkwhiXdTowapXM/operations/
// TODO: create an admin address this should be hardcoded to help prevent users from overtaking you
// TODO: kukai metadata walking to show properly in wallet
// TODO: Do a user look up to find the available contract. --> user should select this contract from a dropdown

//TODO: Start here - finish minting. There is a param issue on the mint with FA2. Check documentation for requirements

export const TezosState = () => {
  const ledger = new MichelsonMap(); // big map
  const metadata = new MichelsonMap(); // big map
  const operators = new MichelsonMap();
  // const token_metadata = new MichelsonMap();
  const token_id = 0;
  const token_info = new MichelsonMap(); //map
  const total_supply = new MichelsonMap(); //big map
  let balance = 0;
  let contractAddress = 'KT1Roq4yG6AtjgDiKa5ARs9FHjwWzavQyfei';

  userBalance.subscribe({ next: (b) => (balance = b) });
  activeContractAddress.subscribe({ next: (c) => (contractAddress = c) });

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

    const admin = await wallet?.getPKH();

    ledger.set({ 0: admin, 1: balance }, 200); // temporary ledger setting for testing purposes ONLY
    token_metadata_0_token_info.set(
      '',
      char2Bytes('ipfs://QmetXCVSjKM8zS7sQcRm7Zg7T9touRru8emsnt7KbPLJVx')
    );
    token_metadata.set(0, {
      token_id: 0,
      token_info: token_metadata_0_token_info,
    });

    if (smartContract) {
      const storage = {
        ledger,
        operators,
        metadata,
        token_metadata,
        total_supply,
        all_tokens: [10],
        admin,
      };

      tezos.wallet
        .originate({
          code: smartContract,
          storage,
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
    return {
      status: 'error',
    };
  };

  const getLocalStorage = async () => {
    const localAccount = JSON.parse(localStorage.getItem('beacon:accounts'))[0]
      .address;
    if (localAccount) {
      console.log('local storage found', localAccount);
      walletAddress.next(localAccount);
    }
  };

  const setMint = async (nft: NFT) => {
    const contract = await tezos.wallet.at(
      contractAddress,
      compose(tzip12, tzip16)
    );

    // const getIPFSData = await pinFileToIPFS(nft);

    if (true) {
      const mint = await contract.methodsObject
        .mint([
          {
            to_: 'tz1PoPDTmv1hESn5JxwLRCL8r4ye3LV21p1a',
            token_id: 123,
            amount: 1,
            // metadata: `ipfs://QmetXCVSjKM8zS7sQcRm7Zg7T9touRru8emsnt7KbPLJVx`,
          },
        ])
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
    }
  };

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

//tz1PoPDTmv1hESn5JxwLRCL8r4ye3LV21p1a --> test user
