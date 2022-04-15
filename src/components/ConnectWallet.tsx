import { BeaconWallet } from '@taquito/beacon-wallet';
import { useEffect, useState } from 'react';
import Tezos from '../State/Tezos';

type props = {
  TezosState: Tezos;
};

const ConnectButton = ({ TezosState }: props): JSX.Element => {
  const [loadingNano, setLoadingNano] = useState<boolean>(false);
  const [wallet, setWallet] = useState<BeaconWallet>(undefined);
  const [address, setAddress] = useState<string>();

  const getAddress = async () => {
    const { address } = await TezosState?.wallet?.client?.getActiveAccount();
    setAddress(address);
  };

  useEffect(() => {
    setWallet(TezosState.wallet);
    getAddress();
  }, [TezosState]);

  const ConnectButtons = () => (
    <div>
      <button className="button" onClick={TezosState.setState}>
        <span>
          <i className="fas fa-wallet"></i>&nbsp; Connect Wallet
        </span>
      </button>
      <button
        style={{ display: 'none' }}
        className="button"
        disabled={loadingNano}
        onClick={() => {}}
      >
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
      <p>{address}</p>
      <button className="button" onClick={TezosState.disconnectWallet}>
        <i className="fas fa-times"></i>&nbsp; Disconnect wallet
      </button>
    </div>
  );

  return (
    <div className="buttons">
      {wallet ? <DisconnectButton /> : <ConnectButtons />}
    </div>
  );
};

export default ConnectButton;
