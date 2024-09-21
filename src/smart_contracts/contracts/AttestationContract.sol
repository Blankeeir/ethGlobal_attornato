// contracts/AttestationContract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttestationContract {
    struct Attestation {
        address verifier;
        uint256 timestamp;
        bool success;
    }

    mapping(uint256 => Attestation[]) public assetAttestations;

    event AttestationCompleted(uint256 assetId, address verifier, bool success, uint256 timestamp);

    function createAttestation(uint256 assetId, bool success) public {
        Attestation memory newAttestation = Attestation({
            verifier: msg.sender,
            timestamp: block.timestamp,
            success: success
        });
        assetAttestations[assetId].push(newAttestation);
        emit AttestationCompleted(assetId, msg.sender, success, block.timestamp);
    }

    function getAttestations(uint256 assetId) public view returns (Attestation[] memory) {
        return assetAttestations[assetId];
    }
}
