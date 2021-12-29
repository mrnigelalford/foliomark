import { TezosToolkit } from '@taquito/taquito';
import { DAppClient } from '@airgap/beacon-sdk';

const Tezos = new TezosToolkit('https://hangzhounet.api.tez.ie');

// const address = 'tz2APwAAPFedmMHAAEvgw6rkwhiXdTowapXM';

const dAppClient = new DAppClient({ name: 'Beacon Docs' });

export const getWalletInfo = async (address: string) => {
  try {
    console.log('Requesting permissions...');
    const permissions = await dAppClient.requestPermissions();
    console.log('Got permissions:', permissions.address);
  } catch (error) {
    console.log('Got error:', error);
  }

  Tezos.tz
    .getBalance(address)
    .then((balance) => console.log(`${balance.toNumber() / 1000000} ꜩ`))
    .catch((error) => console.log(JSON.stringify(error)));
};
