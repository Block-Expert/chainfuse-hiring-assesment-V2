import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { mainnet } from 'wagmi';

import { connect, disconnect, fetchBalance } from '@wagmi/core';
import { useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const Home = () => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);

  const makeShort = (account: string): string => {
    return (
      account.substring(0, 4) + '...' + account.substring(account.length - 7)
    );
  };
  const connectWithMetamask = async () => {
    try {
      if (account === '') {
        const result = await connect({
          chainId: mainnet.id,
          connector: new MetaMaskConnector({
            chains: [mainnet],
            options: {
              shimDisconnect: true,
              UNSTABLE_shimOnConnectSelectAccount: true,
            },
          }),
        });
        setAccount(result.account);

        const b = await fetchBalance({
          address: result.account,
          chainId: mainnet.id,
        });

        console.log('balance', b);
        setBalance(Number(b.formatted));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const disconnectWallet = async () => {
    try {
      const result = await disconnect();
      setAccount('');
      setBalance(0);
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  };

  const login = async () => {
    if (account === '') {
      alert('You must connect wallet before login');
    } else {
      try {
        const res = await api.post('/users/login', { walletAddress: account });
        alert(`Login Successful: ${account}`);
        console.log(res);
      } catch (err: any) {
        console.error(err);
        if (err?.response.status == 404) {
          alert('User Does Not Exist, Signup First');
        }
      }
    }
  };

  const signup = async () => {
    if (account === '') {
      alert('You must connect wallet before signup');
    } else {
      try {
        const res = await api.post('/users/signup', { walletAddress: account });
        alert(`SignUp Successful: ${account}`);
        console.log(res);
      } catch (err) {
        console.error(err);
        alert('SignUp Error');
      }
    }
  };
  return (
    <div className="container">
      <div className="btn-container">
        {account === '' ? (
          <button className="color-blue-button" onClick={connectWithMetamask}>
            Connect Wallet
          </button>
        ) : (
          <button className="color-blue-button" onClick={disconnectWallet}>
            Disconnect Wallet
          </button>
        )}
      </div>
      <div className="content">
        <div className="color-blue">
          <p className="column">Account:</p>
          <p className="color-darkGrey column text-align-right">
            {makeShort(account)}
          </p>
        </div>
        <div className="color-blue">
          <p className="column">Balance:</p>
          <p className="color-darkGrey column text-align-right"> {balance}</p>
        </div>
        <div className="button">
          <button className="login-button" onClick={login}>
            Login
          </button>
          <button className="login-button" onClick={signup}>
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
