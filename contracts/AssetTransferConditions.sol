// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AssetTransferConditions is Ownable {
    mapping(uint256 => string) private assetConditions;

    event AssetConditionSet(uint256 indexed tokenId, string condition);

    function setAssetCondition(uint256 tokenId, string memory condition) public onlyOwner {
        assetConditions[tokenId] = condition;
        emit AssetConditionSet(tokenId, condition);
    }

    function getAssetCondition(uint256 tokenId) public view returns (string memory) {
        return assetConditions[tokenId];
    }
}
