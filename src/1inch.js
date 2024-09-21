// src/1inch.js
import axios from 'axios';
import { ethers } from 'ethers';

export const swapTokens = async (fromToken, toToken, amount, walletAddress, signer) => {
  const url = `https://api.1inch.io/v4.0/100/swap?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=${amount}&fromAddress=${walletAddress}&slippage=1&disableEstimate=true`;

  try {
    const response = await axios.get(url);
    const tx = {
      to: response.data.tx.to,
      data: response.data.tx.data,
      value: ethers.utils.parseUnits(response.data.tx.value, 'wei'),
      gasPrice: ethers.utils.parseUnits(response.data.tx.gasPrice, 'wei'),
      gasLimit: ethers.utils.hexlify(100000), // Estimate gas limit appropriately
    };

    const transaction = await signer.sendTransaction(tx);
    await transaction.wait();
    alert('Swap successful!');
  } catch (error) {
    console.error('Error swapping tokens:', error);
    alert('Swap failed.');
  }
};
