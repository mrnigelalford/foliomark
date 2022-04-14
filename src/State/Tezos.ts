import { MichelsonMap, TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { NetworkType, PermissionScope } from '@airgap/beacon-sdk';
import { Subject } from 'rxjs';
import { NFT } from '../types/NFT.types';

import { code, getStorage } from './single_nft_smartcontract';
import { pinFileToIPFS } from '../pinata';

const scopes: PermissionScope[] = [
  PermissionScope.OPERATION_REQUEST,
  PermissionScope.SIGN,
];

let wallet: BeaconWallet;
let contractAddress = 'KT1UpoPfyxmVrCEnvNGGPXa5zz7JmRk28y9j'; // Hangzhounet location of the smart contract

const walletAddress = new Subject<string>();
const activeWallet = new Subject<BeaconWallet>();
const userBalance = new Subject<number>();
const activeContractAddress = new Subject<string>();

const rpcUrl = 'https://ithacanet.ecadinfra.com';

export const TezosState = () => {
  const setTezos = async (): Promise<{
    Tezos: TezosToolkit;
    Wallet: BeaconWallet;
  }> => {
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
    const { Tezos, Wallet } = await setTezos();

    const { address } = await Wallet.client.getActiveAccount();
    const contract = await Tezos.wallet.at(contractAddress);

    const ipfsData = await pinFileToIPFS(nft);

    const tMetadata = new MichelsonMap();
    tMetadata.set(`ipfs://${ipfsData.IpfsHash}`, ''); // create retrieval method to pull the ipfs data in

    contract.methodsObject
      .mint({
        itokenid: 1,
        iowner: address,
        itokenMetadata: tMetadata,
        iroyalties: [
          {
            partAccount: address,
            partValue: 1000,
          },
        ],
      })
      .send()
      .then((onFulfilled) => {
        console.log('off: ', onFulfilled);
      });
  };

  return {
    activeWallet,
    walletAddress,
    disconnectWallet,
    userBalance,
    setOriginate,
    getLocalStorage,
    setMint,
  };
};
