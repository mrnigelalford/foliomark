import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import {
  NetworkType,
  BeaconEvent,
  defaultEventCallbacks,
} from '@airgap/beacon-sdk';
import { useState } from 'react';

const contractAddress = 'KT1AKo12GNP3VF7t9z4CXi8WooLBph9EXzPN'; // Hangzhounet location of the smart contract

export const Tezos = () => {
  const Tezos = new TezosToolkit('https://hangzhounet.api.tez.ie');

  const [storage, setStorage] = useState<any>();
  const [publicToken, setPublicToken] = useState<string>();
  const [activeWallet, setActiveWallet] = useState<BeaconWallet | undefined>();
  const [userAddress, setUserAddress] = useState<string>();
  const [userBalance, setUserBalance] = useState<number>(0);
  const [contract, setContract] = useState<any>();

  const setContractState = async (userAddress: string): Promise<void> => {
    console.log('ua: ', userAddress);
    // set user balance
    const balance = (await Tezos.tz.getBalance(userAddress)).toNumber();
    setUserBalance(balance);

    // create contract instance
    const contract = await Tezos.wallet.at(contractAddress);
    setContract(contract);
    const storage = await contract.storage();
    setStorage(storage);
  };

  const setWallet = async () => {
    const wallet = new BeaconWallet({
      name: 'Portfolio Marketplace',
      preferredNetwork: NetworkType.HANGZHOUNET,
      disableDefaultEvents: true, // Disable all events / UI. This also disables the pairing alert.
      eventHandlers: {
        // To keep the pairing alert, we have to add the following default event handlers back
        [BeaconEvent.PAIR_INIT]: {
          handler: defaultEventCallbacks.PAIR_INIT,
        },
        [BeaconEvent.PAIR_SUCCESS]: {
          handler: ({ publicKey }) => setPublicToken(publicKey),
        },
      },
    });

    await wallet.requestPermissions({
      network: {
        type: NetworkType.HANGZHOUNET,
        rpcUrl: 'https://hangzhounet.api.tez.ie',
      },
    });

    Tezos.setWalletProvider(wallet);
    setActiveWallet(wallet);
    // checks if wallet was connected before
    const activeAccount = await wallet.client.getActiveAccount();
    if (activeAccount) {
      const userAddress = await wallet.getPKH();
      setUserAddress(userAddress);
      await setContractState(userAddress);
    }
  };

  const disconnectWallet = async (): Promise<void> => {
    //window.localStorage.clear();
    setUserAddress('');
    setUserBalance(0);
    activeWallet.disconnect();

    setPublicToken(null);
    console.log('disconnecting wallet');

    if (activeWallet) {
      await activeWallet.client.removeAllAccounts();
      await activeWallet.client.removeAllPeers();
      await activeWallet.client.destroy();
    }
  };

  // public async setTezos() {}

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
  };
};
