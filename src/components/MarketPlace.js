// src/components/Marketplace.js
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MarketplaceABI from '../abis/Marketplace.json';
import { useNavigate } from 'react-router-dom';

const Marketplace = () => {
  const [assets, setAssets] = useState([]);
  const navigate = useNavigate();
  const marketplaceAddress = 'YOUR_MARKETPLACE_CONTRACT_ADDRESS'; // Replace with your deployed Marketplace contract address

  useEffect(() => {
    const fetchAssets = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(marketplaceAddress, MarketplaceABI, provider);
          const assetCount = await contract.assetCounter();

          const fetchedAssets = [];
          for (let i = 0; i < assetCount; i++) {
            const asset = await contract.assets(i);
            fetchedAssets.push(asset);
          }
          setAssets(fetchedAssets);
        } catch (error) {
          console.error('Error fetching assets:', error);
          alert('Failed to fetch marketplace assets.');
        }
      }
    };

    fetchAssets();
  }, [marketplaceAddress]);

  return (
    <div style={styles.container}>
      <h2>Marketplace</h2>
      <div style={styles.grid}>
        {assets.map((asset, index) => (
          <div key={index} style={styles.card}>
            <img src={asset.image} alt={asset.name} style={styles.image} />
            <h3>{asset.name}</h3>
            <p>Price: {ethers.utils.formatEther(asset.price)} USDC</p>
            <p>
              Attestation Status:{' '}
              {asset.attestationStatus === 0 ? 'Not Open to Attestation' : 'Open to Attestation'}
            </p>
            <button onClick={() => navigate(`/asset/${asset.id}`)} style={styles.button}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  card: {
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '8px',
    width: '250px',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  },
  button: {
    marginTop: '10px',
    padding: '10px 15px',
    cursor: 'pointer',
  },
};

export default Marketplace;
