// src/components/AssetDetails.js
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MarketplaceABI from '../abis/Marketplace.json';
import { useParams } from 'react-router-dom';
// import SignProtocol from '../signProtocol'; // Assume you have a signProtocol.js for integration
import { initiateAttestation } from '../signProtocol';
import { useHistory } from 'react-router-dom';

const AssetDetails = () => {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const history = useHistory();

  const marketplaceAddress = 'YOUR_MARKETPLACE_CONTRACT_ADDRESS';

  useEffect(() => {
    const fetchAsset = async () => {
      if (window.ethereum) {
        const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(tempProvider);
        const tempSigner = tempProvider.getSigner();
        setSigner(tempSigner);
        const contract = new ethers.Contract(marketplaceAddress, MarketplaceABI, tempSigner);
        const fetchedAsset = await contract.assets(id);
        setAsset(fetchedAsset);
      }
    };

    fetchAsset();
  }, [id]);

  const buyAsset = async () => {
    if (asset) {
      const contract = new ethers.Contract(marketplaceAddress, MarketplaceABI, signer);
      const tx = await contract.purchaseAsset(id, {
        value: asset.price,
      });
      await tx.wait();
      alert('Purchase successful!');
      history.push('/dashboard');
    }
  };

  const attestAndBuy = async () => {
    if (asset) {
      // Initiate attestation via Sign Protocol
      await initiateAttestation(asset.id, {
        image: asset.image,
        year: asset.year.toNumber(),
        length: asset.length.toNumber(),
        price: parseFloat(ethers.utils.formatEther(asset.price)),
      });
      alert('Attestation initiated. Please complete the attestation process.');
      // Optionally, redirect to attestation page
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
      <p>Attestation Status: {asset.attestationStatus === 0 ? 'Not Open to Attestation' : 'Open to Attestation'}</p>
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
          <button onClick={() => history.push(`/attest/${id}`)} style={styles.button}>
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
  },
};

export default AssetDetails;
