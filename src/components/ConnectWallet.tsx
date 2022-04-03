import { useState } from 'react';
import { Tezos } from '../State/Tezos';

const ConnectButton = (): JSX.Element => {
  const [loadingNano, setLoadingNano] = useState<boolean>(false);
  const { setWallet, userAddress, disconnectWallet } = Tezos();

  const ConnectButtons = () => (
    <div>
      <button className="button" onClick={setWallet}>
        <span>
          <i className="fas fa-wallet"></i>&nbsp; Connect with wallet
        </span>
      </button>
      <button className="button" disabled={loadingNano} onClick={setWallet}>
        {loadingNano ? (
          <span>
            <i className="fas fa-spinner fa-spin"></i>&nbsp; Loading, please
            wait
          </span>
        ) : (
          <span>
            <i className="fab fa-usb"></i>&nbsp; Connect with Ledger Nano
          </span>
        )}
      </button>
    </div>
  );

  const DisconnectButton = () => (
    <button className="button" onClick={disconnectWallet}>
      <i className="fas fa-times"></i>&nbsp; Disconnect wallet
    </button>
  );

  return (
    <div className="buttons">
      {userAddress ? <DisconnectButton /> : <ConnectButtons />}
    </div>
  );
};

export default ConnectButton;
