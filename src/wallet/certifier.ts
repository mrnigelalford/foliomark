// import { TezosToolkit } from '@taquito/taquito';
import {
  DAppClient,
  TezosOperationType,
  Network,
  NetworkType,
} from '@airgap/beacon-sdk';
import {
  IconDefinition,
  IconPrefix,
  IconName,
} from '@fortawesome/fontawesome-svg-core';
import { AccountInfo } from '../components/AccountInfo.type';

// const Tezos = new TezosToolkit('https://hangzhounet.api.tez.ie');

// const address = 'tz2APwAAPFedmMHAAEvgw6rkwhiXdTowapXM';
const network: Network = { type: NetworkType.MAINNET };

const dAppClient = new DAppClient({
  name: 'FolioMark',
  preferredNetwork: network.type,
});

export const faTez: IconDefinition = {
  prefix: 'fac' as IconPrefix,
  iconName: 'tez' as IconName,
  icon: [
    1170,
    1593,
    [],
    'a729',
    'M755.68,1593q-170.51,0-248.91-82.14a253.6,253.6,0,0,1-78.15-177,117.39,117.39,0,0,1,13.69-58.5A101.21,101.21,0,0,1,479.64,1238a130.22,130.22,0,0,1,116.24,0A99.55,99.55,0,0,1,633,1275.36a115,115,0,0,1,14.18,58.5,111.73,111.73,0,0,1-19.91,68.45,92.78,92.78,0,0,1-47.31,34.62,129.18,129.18,0,0,0,74.67,46.55,370,370,0,0,0,101.8,14.68,226.91,226.91,0,0,0,128.19-38.33,224,224,0,0,0,83.63-113.25,492,492,0,0,0,27.38-169.5,465.07,465.07,0,0,0-29.87-176.23,217.54,217.54,0,0,0-86.37-109.52,229.68,229.68,0,0,0-124.43-35.59,236.75,236.75,0,0,0-107.78,36.59L567.26,932.4V892.33L926.43,410.5H428.62v500A178.9,178.9,0,0,0,456,1012.8a94.34,94.34,0,0,0,83.63,40.07,139.85,139.85,0,0,0,82.63-29.12,298.38,298.38,0,0,0,69.2-71.19,24.86,24.86,0,0,1,9-11.94,18.4,18.4,0,0,1,12-4.48,41.55,41.55,0,0,1,23.4,9.95,49.82,49.82,0,0,1,12.69,33.85,197.86,197.86,0,0,1-4.48,24.89,241,241,0,0,1-85.38,106,211.78,211.78,0,0,1-119.76,36.38q-161.67,0-224-63.72A238.67,238.67,0,0,1,253.2,909.25V410.5H0V317.6H254.38V105.78L196.14,47.5V0h169l63.48,32.86V317.6l657.6-2,65.47,65.71L748.46,786.5a271,271,0,0,1,76.16-18.42A330.1,330.1,0,0,1,972,810.15a302.7,302.7,0,0,1,126.95,113.29,399.78,399.78,0,0,1,57.25,136.65,575.65,575.65,0,0,1,13.69,117,489.39,489.39,0,0,1-49.78,216.79,317.92,317.92,0,0,1-149.35,149.35A483.27,483.27,0,0,1,755.68,1593Z',
  ],
};

export const setRequest = async (accountInfo: { address: string }) => {
  if (!accountInfo) return;
  const response = await dAppClient.requestOperation({
    operationDetails: [
      {
        kind: TezosOperationType.TRANSACTION,
        destination: accountInfo.address, // Send to ourselves
        amount: '1', // Amount in mutez, the smallest unit in Tezos
      },
    ],
  });
  console.log('Operation Hash:', response.transactionHash);
  const explorerLink = await dAppClient.blockExplorer.getTransactionLink(
    response.transactionHash,
    network
  );

  console.log('Block Explorer:', explorerLink);
};

export const disconnectAccount = async () => {
  localStorage.removeItem('tezAccount');
  dAppClient.clearActiveAccount();
};
export const hasTezAccountInfo = async () => {
  const activeAccount = await dAppClient.getActiveAccount();
  if (activeAccount) {
    localStorage.setItem('tezAccount', JSON.stringify(activeAccount));
    return activeAccount;
  } else {
    console.log('Not connected!');
    return undefined;
  }
};

export const getWalletInfo = async (accountInfo: AccountInfo) => {
  if (accountInfo) {
    return disconnectAccount().then((info: any) => {
      console.log('logout info: ', info);
      return undefined;
    });
  }
  const activeAccount = await dAppClient.getActiveAccount();

  if (activeAccount) {
    return activeAccount;
  } else {
    try {
      console.log('Requesting permissions...');
      return await dAppClient.requestPermissions({
        network: network,
      });
    } catch (error) {
      console.log('Got error:', error);
    }
  }
};
