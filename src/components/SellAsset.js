// src/components/SellAsset.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import MarketplaceABI from '../abis/Marketplace.json';
import AssetTokenABI from '../abis/AssetToken.json';
import { useNavigate } from 'react-router-dom'; // Updated hook
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

const SellAsset = () => {
  const [assetData, setAssetData] = useState({
    name: '',
    image: '',
    year: '',
    length: '',
    price: '',
  });
  const navigate = useNavigate(); // Updated hook

  const handleChange = (e) => {
    setAssetData({ ...assetData, [e.target.name]: e.target.value });
  };

  const listAsset = async (e) => {
    e.preventDefault();

    try {
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
      const marketplaceContract = new ethers.Contract('YOUR_MARKETPLACE_CONTRACT_ADDRESS', MarketplaceABI, signer);
      const assetTokenContract = new ethers.Contract('YOUR_ASSETTOKEN_CONTRACT_ADDRESS', AssetTokenABI, signer);

      // Mint NFT
      const tx1 = await assetTokenContract.createAssetToken(await signer.getAddress(), assetData.image);
      const receipt1 = await tx1.wait();
      const tokenId = receipt1.events[0].args.tokenId.toNumber();

      // List Asset
      const priceInWei = ethers.utils.parseEther(assetData.price);
      const tx2 = await marketplaceContract.listAsset(
        tokenId,
        priceInWei,
        assetData.name,
        assetData.image,
        parseInt(assetData.year),
        parseFloat(assetData.length)
      );
      await tx2.wait();

      alert('Asset listed successfully!');
      navigate('/marketplace');
    } catch (error) {
      console.error(error);
      alert('Error listing asset.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sell Your Real-World Asset</h2>
      <form onSubmit={listAsset} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Asset Name"
          value={assetData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={assetData.image}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={assetData.year}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="number"
          name="length"
          placeholder="Length"
          step="0.01"
          value={assetData.length}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="price"
          placeholder="Price in USDC"
          value={assetData.price}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          List Asset
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'inline-block',
    textAlign: 'left',
  },
  input: {
    display: 'block',
    margin: '10px 0',
    padding: '10px',
    width: '300px',
  },
  button: {
    padding: '10px 20px',
  },
};

export default SellAsset;
