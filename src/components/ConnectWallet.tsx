import { useEffect, useState } from 'react';
import { Tezos } from '../State/Tezos';

const ConnectButton = (): JSX.Element => {
  const [loadingNano, setLoadingNano] = useState<boolean>(false);
  const [localUserAddress, setLocalUserAddress] = useState<string>();
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

  // use local storage to prevent the user from re-logging in

  useEffect(() => {
    const localBeacon = localStorage.getItem('beacon:accounts');
    const userAddress = JSON.parse(localBeacon)[0].address;

    console.log('bruh: ', JSON.parse(localBeacon)[0]);

    if (userAddress) {
      setLocalUserAddress(userAddress);
    }
  }, [userAddress]);

  return (
    <div className="buttons">
      {userAddress || localUserAddress ? (
        <DisconnectButton />
      ) : (
        <ConnectButtons />
      )}
    </div>
  );
};

export default ConnectButton;
