// src/components/AssetDetails.js
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MarketplaceABI from '../abis/Marketplace.json';
import { useParams, useNavigate } from 'react-router-dom';
import { initiateAttestation } from '../signProtocol'; // Ensure you have this function implemented

const AssetDetails = () => {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const navigate = useNavigate();

  const marketplaceAddress = 'YOUR_MARKETPLACE_CONTRACT_ADDRESS'; // Replace with your deployed Marketplace contract address

  useEffect(() => {
    const fetchAsset = async () => {
      if (window.ethereum) {
        try {
          const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(tempProvider);
          const tempSigner = tempProvider.getSigner();
          setSigner(tempSigner);
          const contract = new ethers.Contract(marketplaceAddress, MarketplaceABI, tempSigner);
          const fetchedAsset = await contract.assets(id);
          setAsset(fetchedAsset);
        } catch (error) {
          console.error('Error fetching asset:', error);
          alert('Failed to fetch asset details.');
        }
      }
    };

    fetchAsset();
  }, [id, marketplaceAddress]);

  const buyAsset = async () => {
    if (asset) {
      try {
        const contract = new ethers.Contract(marketplaceAddress, MarketplaceABI, signer);
        const tx = await contract.purchaseAsset(id, {
          value: asset.price,
        });
        await tx.wait();
        alert('Purchase successful!');
        navigate('/dashboard');
      } catch (error) {
        console.error('Purchase failed:', error);
        alert('Purchase failed.');
      }
    }
  };

  const attestAndBuy = async () => {
    if (asset) {
      try {
        // Initiate attestation via Sign Protocol
        await initiateAttestation(asset.id, {
          image: asset.image,
          year: asset.year.toNumber(),
          length: asset.length.toNumber(),
          price: parseFloat(ethers.utils.formatEther(asset.price)),
        });
        alert('Attestation initiated. Please complete the attestation process.');
        // Optionally, redirect to attestation page
      } catch (error) {
        console.error('Attestation failed:', error);
        alert('Attestation failed.');
      }
    }
  };

  const attestAsset = async () => {
    if (asset) {
      // Navigate to attest component
      navigate(`/attest/${id}`);
    }
  };

  if (!asset) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h2>{asset.name}</h2>
      <img src={asset.image} alt={asset.name} style={styles.image} />
      <p>Price: {ethers.utils.formatEther(asset.price)} USDC</p>
      <p>Year: {asset.year.toNumber()}</p>
      <p>Length: {asset.length.toNumber()}</p>
      <p>
        Attestation Status:{' '}
        {asset.attestationStatus === 0 ? 'Not Open to Attestation' : 'Open to Attestation'}
      </p>
      {asset.attestationStatus === 0 ? (
        <>
          <button onClick={buyAsset} style={styles.button}>
            Buy
          </button>
          <button onClick={attestAndBuy} style={styles.button}>
            Attest and Buy
          </button>
        </>
      ) : (
        <>
          <button onClick={buyAsset} style={styles.button}>
            Buy
          </button>
          <button onClick={attestAsset} style={styles.button}>
            Attest
          </button>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  image: {
    width: '300px',
    height: '300px',
    objectFit: 'cover',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
};

export default AssetDetails;
