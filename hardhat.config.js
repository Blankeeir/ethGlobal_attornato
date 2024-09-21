// hardhat.config.js
require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    gnosis: {
      url: 'https://rpc.gnosischain.com',
      accounts: ['YOUR_PRIVATE_KEY'],
    },
  },
};
