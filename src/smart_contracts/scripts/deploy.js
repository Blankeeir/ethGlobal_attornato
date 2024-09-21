// scripts/deploy.js
const hre = require('hardhat');

async function main() {
  const AssetToken = await hre.ethers.getContractFactory('AssetToken');
  const assetToken = await AssetToken.deploy();
  await assetToken.deployed();
  console.log('AssetToken deployed to:', assetToken.address);

  const AttestationContract = await hre.ethers.getContractFactory('AttestationContract');
  const attestationContract = await AttestationContract.deploy();
  await attestationContract.deployed();
  console.log('AttestationContract deployed to:', attestationContract.address);

  const Marketplace = await hre.ethers.getContractFactory('Marketplace');
  const marketplace = await Marketplace.deploy(assetToken.address, attestationContract.address);
  await marketplace.deployed();
  console.log('Marketplace deployed to:', marketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
