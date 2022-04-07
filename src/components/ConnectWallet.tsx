import { useState } from 'react';
import { TezosState } from '../State/Tezos';

const ConnectButton = (): JSX.Element => {
  const [loadingNano, setLoadingNano] = useState<boolean>(false);
  const [localUserAddress, setLocalUserAddress] = useState<string>('');
  const { setWallet, walletAddress, disconnectWallet, userBalance } =
    TezosState();

  walletAddress.subscribe({
    next: (u) => {
      console.log('user: ', u);
      setLocalUserAddress(u);
    },
  });

  userBalance.subscribe({
    next: (u) => {
      console.log('ub: ', u);
    },
  });

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
    <div>
      <p>{localUserAddress}</p>
      <button className="button" onClick={disconnectWallet}>
        <i className="fas fa-times"></i>&nbsp; Disconnect wallet
      </button>
    </div>
  );

  return (
    <div className="buttons">
      {localUserAddress ? <DisconnectButton /> : <ConnectButtons />}
    </div>
  );
};

export default ConnectButton;