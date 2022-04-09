import { useMutation } from '@apollo/client';
import axios from 'axios';
import FormData from 'form-data';
import { NFT } from './types/NFT.types';

const pinata = {
  api_key: 'f896d028836c7141afde',
  secret_api_key:
    '94d20b091ecc3cbb9ed45c833af115d2c02199cf5a7bee0003f660db09c9f61b',
};

export const setPinata = async () => {
  const url = `https://api.pinata.cloud/data/testAuthentication`;
  return axios
    .get(url, {
      headers: {
        pinata_api_key: '845fb67b8da495cc90e7',
        pinata_secret_api_key:
          'b0d62e6c7c0d37bc777809021faef9926cf1af532394f1ee1b78ccdf64531657',
      },
    })
    .then(function (response) {
      console.log('pin_success: ', response);
    })
    .catch(function (error) {
      console.log('pin_error: ', error);
    });
};

enum categories {
  Art = 'Art',
  Website = 'Website',
  Mobile = 'Mobile',
  Game = 'Game',
  Print = 'Print',
  illustration = 'illustration',
  study = 'study',
  Template = 'Template',
  Product = 'Product',
  Design = 'Design',
  Typography = 'Typography',
}

interface IPFSResponse {
  IpfsHash: string;
  PinSize: Number;
  Timestamp: Date;
}

export const pinFileToIPFS = (nftMetadata: NFT): Promise<IPFSResponse> => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  // any valid readStream source will work.
  let data = new FormData();
  data.append('file', nftMetadata.rawImg[0]);

  //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
  //metadata is optional
  const metadata = JSON.stringify({
    name: 'testname',
    keyvalues: {
      exampleKey: 'exampleValue',
    },
  });
  data.append('pinataMetadata', metadata);

  //pinataOptions are optional
  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    customPinPolicy: {
      regions: [
        {
          id: 'FRA1',
          desiredReplicationCount: 1,
        },
        {
          id: 'NYC1',
          desiredReplicationCount: 2,
        },
      ],
    },
  });
  data.append('pinataOptions', pinataOptions);

  return axios
    .post(url, data, {
      maxBodyLength: 10000, //this is needed to prevent axios from erroring out with large files
      headers: {
        'Content-Type': `multipart/form-data; boundary=WebKitFormBoundaryCIkXuNWC8OhEuT3S`,
        pinata_api_key: pinata.api_key,
        pinata_secret_api_key: pinata.secret_api_key,
      },
    })
    .then(function (IPFsResponse) {
      console.log('file_success: ', IPFsResponse.data);
      return IPFsResponse.data;
    })
    .catch(function (error) {
      console.log('file_error: ', error);
    });
};
