// contracts/Marketplace.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AssetToken.sol";
import "./AttestationContract.sol";

contract Marketplace {
    AssetToken public assetToken;
    AttestationContract public attestationContract;

    struct Asset {
        uint256 id;
        address payable owner;
        uint256 price; // in USDC
        string name;
        string image;
        uint256 year;
        float length;
        uint8 attestationStatus; // 0: Not Open, 1: Open
    }

    uint256 public assetCounter;
    mapping(uint256 => Asset) public assets;

    event AssetListed(uint256 assetId, address owner, uint256 price, string name, string image, uint256 year, float length);
    event AssetPurchased(uint256 assetId, address buyer, uint256 price);
    event AssetAttested(uint256 assetId, bool success);

    constructor(address _assetTokenAddress, address _attestationAddress) {
        assetToken = AssetToken(_assetTokenAddress);
        attestationContract = AttestationContract(_attestationAddress);
    }

    function listAsset(
        uint256 tokenId,
        uint256 price,
        string memory name,
        string memory image,
        uint256 year,
        float length
    ) public {
        require(assetToken.ownerOf(tokenId) == msg.sender, "Only owner can list asset");
        assetToken.transferFrom(msg.sender, address(this), tokenId);

        assets[assetCounter] = Asset({
            id: assetCounter,
            owner: payable(msg.sender),
            price: price,
            name: name,
            image: image,
            year: year,
            length: length,
            attestationStatus: 0
        });

        emit AssetListed(assetCounter, msg.sender, price, name, image, year, length);
        assetCounter += 1;
    }

    function purchaseAsset(uint256 assetId) public payable {
        Asset storage asset = assets[assetId];
        require(msg.value >= asset.price, "Insufficient payment");
        require(asset.attestationStatus == 0, "Asset not available for direct purchase");

        asset.owner.transfer(msg.value);
        assetToken.transferFrom(address(this), msg.sender, assetId);

        emit AssetPurchased(assetId, msg.sender, asset.price);
    }

    function attestAndBuy(uint256 assetId) public payable {
        Asset storage asset = assets[assetId];
        require(asset.attestationStatus == 0, "Asset already open for attestation");

        // Deduct attestation fee (Assume fixed fee for simplicity)
        uint256 attestationFee = 0.01 ether;
        require(msg.value >= attestationFee, "Insufficient attestation fee");

        // Open asset to attestation
        asset.attestationStatus = 1;

        emit AssetAttested(assetId, true); // Assuming success for simplicity
    }

    function verifyAsset(uint256 assetId, bool success) public {
        attestationContract.createAttestation(assetId, success);
        Asset storage asset = assets[assetId];
        asset.attestationStatus = success ? 0 : 1;

        emit AssetAttested(assetId, success);
    }
}
