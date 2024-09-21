// src/wallet.js
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';

const connectWallet = async () => {
  const provider = new WalletConnectProvider({
    infuraId: 'YOUR_INFURA_ID',
  });

  await provider.enable();
  const web3Provider = new ethers.providers.Web3Provider(provider);
  const signer = web3Provider.getSigner();
  // Use signer for transactions
};

export default connectWallet;
