import { useEffect, useState } from 'react';
import { Tezos } from '../State/Tezos';

const ConnectButton = (): JSX.Element => {
  const [loadingNano, setLoadingNano] = useState<boolean>(false);
  const [localUserAddress, setLocalUserAddress] = useState<string>('');
  const { setWallet, walletAddress, disconnectWallet, userBalance } = Tezos();

  // use local storage to prevent the user from re-logging in

  // useEffect(() => {
  //   const localBeacon = localStorage.getItem('beacon:accounts');
  //   if (!JSON.parse(localBeacon)) return;
  //   const userAddress = JSON.parse(localBeacon)[0].address;

  //   if (userAddress) {
  //     setLocalUserAddress(userAddress);
  //   }
  // }, [walletAddress]);

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
