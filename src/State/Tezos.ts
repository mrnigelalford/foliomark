import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { NetworkType } from '@airgap/beacon-sdk';
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
    // set user balance
    if (!userAddress) setUserAddress(userAddress);

    const balance = (await Tezos.tz.getBalance(userAddress)).toNumber();
    setUserBalance(balance);

    // create contract instance
    const contract = await Tezos.wallet.at(contractAddress);
    setContract(contract);
    const storage = await contract.storage();
    setStorage(storage);
  };

  const setActiveAccount = async (wallet: BeaconWallet) => {
    const userAddress = await wallet.getPKH();
    console.log('preset user address: ', userAddress);
    setUserAddress(userAddress);
    await setContractState(userAddress);
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

    if (activeAccount) {
      setActiveAccount(wallet);
    } else {
      await wallet.client.requestPermissions({
        network: {
          type: NetworkType.HANGZHOUNET,
          rpcUrl: 'https://hangzhounet.api.tez.ie',
        },
      });
      await setActiveAccount(wallet);
      // Tezos.setWalletProvider(wallet);
    }

    setActiveWallet(wallet);
    setPublicToken(wallet.publicKey);
  };

  const disconnectWallet = async (): Promise<void> => {
    //window.localStorage.clear();
    setUserAddress('');
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
  };
};
