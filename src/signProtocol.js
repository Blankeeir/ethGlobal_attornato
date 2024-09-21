// src/signProtocol.js
import axios from 'axios';

const SIGN_PROTOCOL_API_URL = 'https://api.signprotocol.io'; // Replace with actual URL
const SIGN_PROTOCOL_API_KEY = 'YOUR_SIGN_PROTOCOL_API_KEY';

export const initiateAttestation = async (assetId, schema) => {
  try {
    const response = await axios.post(
      `${SIGN_PROTOCOL_API_URL}/attestations`,
      {
        assetId,
        schema,
      },
      {
        headers: {
          Authorization: `Bearer ${SIGN_PROTOCOL_API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error initiating attestation:', error);
    throw error;
  }
};

export default initiateAttestation;