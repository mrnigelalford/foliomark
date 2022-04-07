import { MichelsonMap, TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { NetworkType, PermissionScope, Storage } from '@airgap/beacon-sdk';
import smartContract from './smartContract';
import { Subject } from 'rxjs';

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

const tezosBlockchain = new TezosToolkit('https://hangzhounet.api.tez.ie');

export const TezosState = () => {
  const ledger = new MichelsonMap(); // big map
  const metadata = new MichelsonMap(); // big map
  const operators = new MichelsonMap();
  const token_metadata = new MichelsonMap();
  const token_id = 0;
  const token_info = new MichelsonMap(); //map
  const total_supply = new MichelsonMap(); //big map

  const setWallet = async () => {
    wallet = new BeaconWallet({
      name: 'Portfolio Marketplace',
      preferredNetwork: NetworkType.HANGZHOUNET,
    });

    await wallet.client.requestPermissions({
      scopes,
      network: {
        type: NetworkType.HANGZHOUNET,
        rpcUrl: 'https://hangzhounet.api.tez.ie',
      },
    });

    tezosBlockchain.setWalletProvider(wallet);

    activeWallet.next(wallet);
    walletAddress.next(await wallet.getPKH());
    userBalance.next(
      (await tezosBlockchain.tz.getBalance(await wallet.getPKH())).toNumber()
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

    ledger.set({ 0: admin, 1: 20 }, 200); // temporary ledger setting for testing purposes ONLY

    if (smartContract) {
      const storage = {
        admin,
        all_tokens: [1],
        ledger,
        metadata,
        operators,
        token_metadata,
        token_id,
        token_info,
        total_supply,
      };

      tezosBlockchain.wallet
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
  };
};

//tz1PoPDTmv1hESn5JxwLRCL8r4ye3LV21p1a --> test user
