// src/components/LandingPage.js
import React from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useHistory } from 'react-router-dom';
import { ethers } from 'ethers';

const LandingPage = () => {
  const { setShowAuthFlow } = useDynamicContext();
  const history = useHistory();

  const connectWallet = async () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: 'YOUR_INFURA_ID',
        },
      },
    };

    const web3Modal = new Web3Modal({
      network: 'mainnet',
      cacheProvider: true,
      providerOptions,
    });

    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    console.log('Connected address:', address);
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to Attornato</h1>
      <button style={styles.button} onClick={() => setShowAuthFlow(true)}>
        Login/Sign-up
      </button>
      <button style={styles.button} onClick={connectWallet}>
        Connect Wallet
      </button>
      <button style={styles.button} onClick={() => history.push('/dashboard')}>
        Go to Dashboard
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
  },
};

export default LandingPage;
