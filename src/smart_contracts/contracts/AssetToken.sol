// contracts/AssetToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AssetToken is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("dYACHT", "DYT") {
        tokenCounter = 0;
    }

    function createAssetToken(address owner, string memory tokenURI)
        public
        returns (uint256)
    {
        uint256 newItemId = tokenCounter;
        _safeMint(owner, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenCounter += 1;
        return newItemId;
    }
}
