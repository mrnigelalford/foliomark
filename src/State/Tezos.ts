import { MichelsonMap, TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { NetworkType, PermissionScope } from '@airgap/beacon-sdk';
import { NFT } from '../types/NFT.types';

import { code, getStorage } from './single_nft_smartcontract';
import { pinFileToIPFS } from '../pinata';

const scopes: PermissionScope[] = [
  PermissionScope.OPERATION_REQUEST,
  PermissionScope.SIGN,
];

export default class Tezos {
  Tezos: TezosToolkit;
  wallet: BeaconWallet;
  rpcUrl = 'https://ithacanet.ecadinfra.com';
  contractAddress = 'KT1Vm3EJiq2J4TbLexUZ19teeq71zy4moiZx'; // Ithacanet location of the smart contract

  setState = async () => {
    this.Tezos = new TezosToolkit(this.rpcUrl);
    this.wallet = new BeaconWallet({
      name: 'Portfolio Marketplace',
      preferredNetwork: NetworkType.ITHACANET,
    });

    await this.wallet.client.requestPermissions({
      scopes,
      network: {
        type: NetworkType.ITHACANET,
        rpcUrl: this.rpcUrl,
      },
    });

    this.Tezos.setWalletProvider(this.wallet);
  };

  disconnectWallet = async (): Promise<void> => {
    this.wallet.client.removeAllAccounts();
    this.wallet.client.removeAllPeers();
    this.wallet.client.destroy();
  };

  setOriginate = async () => {
    if (!this.wallet) await this.setState();
    const { address } = await this.wallet.client.getActiveAccount();

    if (address) {
      const storage = getStorage(address);
      const contractCode = code;

      if (contractCode && storage) {
        this.Tezos.wallet
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
            this.contractAddress = contract.address;
          })
          .catch((error) => console.log('Error: ', error));
      }
    }
  };

  // getLocalStorage = async () => {
  //   const localAccount = JSON.parse(localStorage.getItem('beacon:accounts'))[0]
  //     .address;
  //   if (localAccount) {
  //     walletAddress.next(localAccount);
  //   }
  // };

  setMint = async (nft: NFT) => {
    if (!this.wallet) await this.setState();
    const { address } = await this.wallet.client.getActiveAccount();
    const contract = await this.Tezos.wallet.at(this.contractAddress);
    const ipfsData = await pinFileToIPFS(nft);
    const tMetadata = new MichelsonMap();

    console.log('nft: ', nft.quantity);

    tMetadata.set('title', nft.title);
    tMetadata.set('price', nft.price.toString());
    tMetadata.set('category', nft.category);
    tMetadata.set('description', nft.description);
    tMetadata.set('royalties', JSON.stringify(nft.royalties));
    tMetadata.set('quantity', nft.quantity.toString());
    tMetadata.set('license', nft.license);
    tMetadata.set('token', nft.token);
    tMetadata.set('ipfs', `ipfs://${ipfsData.IpfsHash}`);

    contract.methodsObject
      .mint({
        itokenid: new Date().getMilliseconds(),
        iamount: nft.quantity,
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
        console.log('call complete: ', onFulfilled);
      });
  };
}
