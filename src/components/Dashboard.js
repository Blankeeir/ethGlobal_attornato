// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MarketplaceABI from '../abis/Marketplace.json';
import { useNavigate } from 'react-router-dom'; // Updated import

const Dashboard = () => {
  const [purchases, setPurchases] = useState([]);
  const [sales, setSales] = useState([]);
  const [verifications, setVerifications] = useState([]);
  const navigate = useNavigate(); // Updated hook

  const marketplaceAddress = 'YOUR_MARKETPLACE_CONTRACT_ADDRESS';

  useEffect(() => {
    const fetchData = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(marketplaceAddress, MarketplaceABI, provider);

        // Fetch Historical Purchases
        const purchaseFilter = contract.filters.PurchaseEvent();
        const purchaseEvents = await contract.queryFilter(purchaseFilter);
        setPurchases(purchaseEvents.map(event => event.args));

        // Fetch Historical Sales
        const saleFilter = contract.filters.SaleEvent();
        const saleEvents = await contract.queryFilter(saleFilter);
        setSales(saleEvents.map(event => event.args));

        // Fetch Historical Verifications
        const verificationFilter = contract.filters.VerificationEvent();
        const verificationEvents = await contract.queryFilter(verificationFilter);
        setVerifications(verificationEvents.map(event => event.args));
      }
    };

    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h2>User Dashboard</h2>
      <button style={styles.navButton} onClick={() => navigate('/marketplace')}>
        Explore Marketplace
      </button>
      <button style={styles.navButton} onClick={() => navigate('/sell')}>
        Sell My Asset
      </button>

      <div style={styles.section}>
        <h3>Historical Purchases</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Seller Address</th>
              <th>Token Transferred</th>
              <th>Gas Fee</th>
              <th>Timestamp</th>
              <th>Asset Name</th>
              <th>Attestation Status</th>
              <th>Verifying Node</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, index) => (
              <tr key={index}>
                <td>{purchase.seller}</td>
                <td>{purchase.tokenTransferred.toString()}</td>
                <td>{ethers.utils.formatEther(purchase.gasFee)}</td>
                <td>{new Date(purchase.timestamp.toNumber() * 1000).toLocaleString()}</td>
                <td>{purchase.assetName}</td>
                <td>{purchase.attestationStatus}</td>
                <td>{purchase.verifyingNode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.section}>
        <h3>Historical Sales</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Buyer Address</th>
              <th>Token Transferred</th>
              <th>Gas Fee</th>
              <th>Timestamp</th>
              <th>Asset Name</th>
              <th>Attestation Status</th>
              <th>Verifying Node</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr key={index}>
                <td>{sale.buyer}</td>
                <td>{sale.tokenTransferred.toString()}</td>
                <td>{ethers.utils.formatEther(sale.gasFee)}</td>
                <td>{new Date(sale.timestamp.toNumber() * 1000).toLocaleString()}</td>
                <td>{sale.assetName}</td>
                <td>{sale.attestationStatus}</td>
                <td>{sale.verifyingNode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.section}>
        <h3>Historical Verifications</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Trader 1 Address</th>
              <th>Trader 2 Address</th>
              <th>Token Transferred</th>
              <th>Gas Fee</th>
              <th>Timestamp</th>
              <th>Asset Name</th>
              <th>Approval</th>
            </tr>
          </thead>
          <tbody>
            {verifications.map((verification, index) => (
              <tr key={index}>
                <td>{verification.trader1}</td>
                <td>{verification.trader2}</td>
                <td>{verification.tokenTransferred.toString()}</td>
                <td>{ethers.utils.formatEther(verification.gasFee)}</td>
                <td>{new Date(verification.timestamp.toNumber() * 1000).toLocaleString()}</td>
                <td>{verification.assetName}</td>
                <td>{verification.approved ? 'Approved' : 'Rejected'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  navButton: {
    margin: '10px',
    padding: '10px 20px',
  },
  section: {
    marginTop: '30px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
};

export default Dashboard;
