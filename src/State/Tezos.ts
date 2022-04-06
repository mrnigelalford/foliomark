import { MichelsonMap, TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { NetworkType, PermissionScope, Storage } from '@airgap/beacon-sdk';
import { useState } from 'react';
import smartContract from './smartContract';
import { TezBridgeSigner } from '@taquito/tezbridge-signer';

const contractAddress = 'KT1AKo12GNP3VF7t9z4CXi8WooLBph9EXzPN'; // Hangzhounet location of the smart contract

const scopes: PermissionScope[] = [
  PermissionScope.OPERATION_REQUEST,
  PermissionScope.SIGN,
];

export const Tezos = () => {
  const Tezos = new TezosToolkit('https://hangzhounet.api.tez.ie');
  let activeWallet;
  let userAddress;

  const [publicToken, setPublicToken] = useState<string>();
  const [userBalance, setUserBalance] = useState<number>(0);

  const setContractState = async (walletAddress: string): Promise<Storage> => {
    return (await Tezos.wallet.at(contractAddress)).storage();
  };

  const setActiveAccount = async (wallet: BeaconWallet) => {
    Tezos.setWalletProvider(wallet);
    const walletAddress = await wallet.getPKH();

    await setContractState(walletAddress);
    await setOriginate();
    userAddress = walletAddress;
    activeWallet = wallet;
  };

  const setWallet = async () => {
    let wallet;
    if (activeWallet) wallet = activeWallet;
    else
      wallet = new BeaconWallet({
        name: 'Portfolio Marketplace',
        preferredNetwork: NetworkType.HANGZHOUNET,
      });

    const activeAccount = await wallet.client.getActiveAccount();
    // You can request specific permissions if you want

    if (activeAccount) {
      setActiveAccount(wallet);
    } else {
      await wallet.client.requestPermissions({
        scopes,
        network: {
          type: NetworkType.HANGZHOUNET,
          rpcUrl: 'https://hangzhounet.api.tez.ie',
        },
      });
      await setActiveAccount(wallet);
    }

    setPublicToken(wallet.publicKey);
  };

  const disconnectWallet = async (): Promise<void> => {
    //window.localStorage.clear();
    userAddress = undefined;
    setUserBalance(0);
    activeWallet.clearActiveAccount();

    setPublicToken(null);
    console.log('disconnecting wallet');

    if (activeWallet) {
      await activeWallet.client.removeAllAccounts();
      await activeWallet.client.removeAllPeers();
      await activeWallet.client.destroy();
    }
  };

  const ledger = new MichelsonMap(); // big map
  const metadata = new MichelsonMap(); // big map
  const operators = new MichelsonMap();
  const token_metadata = new MichelsonMap();
  const token_id = 0;
  const token_info = new MichelsonMap(); //map
  const total_supply = new MichelsonMap(); //big map

  ledger.set({ 0: 'tz1PoPDTmv1hESn5JxwLRCL8r4ye3LV21p1a', 1: 20 }, 200);
  const storage = {
    admin: 'tz1PoPDTmv1hESn5JxwLRCL8r4ye3LV21p1a',
    all_tokens: [1],
    ledger,
    metadata,
    operators,
    token_metadata,
    token_id,
    token_info,
    total_supply,
  };

  const setOriginate = async () => {
    if (smartContract) {
      const wallet = new BeaconWallet({
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
      Tezos.setWalletProvider(wallet);
      Tezos.wallet
        .originate({
          code: smartContract,
          storage,
        })
        .send()
        .then((originationOp) => {
          console.log(`Waiting for confirmation of origination...`);
          return originationOp.contract();
        })
        .then((contract) =>
          console.log(`Origination completed for ${contract.address}.`)
        )
        .catch((error) => console.log('Error: ', error));
    }
    return {
      status: 'error',
    };
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
    publicToken,
    userAddress,
    disconnectWallet,
    userBalance,
    setContractState,
    setOriginate,
  };
};

//tz1PoPDTmv1hESn5JxwLRCL8r4ye3LV21p1a
