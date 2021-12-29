import React from 'react';
import { getWalletInfo } from '../../wallet/certifier';

export const tezAddress = 'tz2APwAAPFedmMHAAEvgw6rkwhiXdTowapXM';

const Wallet = () => (
  <div className="row">
    <div className="col-lg-3 mb30">
      <span className="box-url" onClick={() => getWalletInfo(tezAddress)}>
        <span className="box-url-label">Most Popular</span>
        <img src="./img/wallet/1.png" alt="" className="mb20" />
        <h4>Metamask</h4>
      </span>
    </div>
  </div>
);
export default Wallet;
