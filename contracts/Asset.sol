// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./AssetData.sol";
import "./AssetOwnership.sol";
import "./AssetTransferConditions.sol";

interface IUserRoles {
    function hasRole(bytes32 role, address account) external view returns (bool);
    function PURCHASING_DEP_ROLE() external view returns (bytes32);
    function MAINTENANCE_DEP_ROLE() external view returns (bytes32);
}

contract Asset is ERC721{

    uint256 public nextTokenId;
    
    IUserRoles public userRoles;
    AssetData public assetData;
    AssetOwnership public assetOwnership;
    AssetTransferConditions public assetTransferConditions;

    constructor(address _userRoles) ERC721("Asset", "ASSET") {
        userRoles = IUserRoles(_userRoles);
        assetData = new AssetData();
        assetTransferConditions = new AssetTransferConditions();
        assetOwnership = new AssetOwnership();
    }

    modifier onlyPurchaseDepartment() {
        require(userRoles.hasRole(userRoles.PURCHASING_DEP_ROLE(), msg.sender), "Caller is not in Purchase Department");
        _;
    }
    modifier onlyMaintenanceDepartment() {
        require(userRoles.hasRole(userRoles.MAINTENANCE_DEP_ROLE(), msg.sender), "Caller is not in maintenance department");
        _;
    }

     modifier tokenExists(uint256 tokenId) {
        require(_exists(tokenId), "ERC721: invalid token ID");
        _;
    }

    function registerAsset(address owner, string memory details, string memory transferCondition) public onlyPurchaseDepartment returns (bool) {
        uint tokenId = nextTokenId;
        _mint(owner, tokenId);
        assetData.addData(tokenId, details);
        assetOwnership.initializeOwner(tokenId, owner);
        assetTransferConditions.setAssetCondition(tokenId, transferCondition);
        nextTokenId++;
        return true;
    }
    function getAssetDetails(uint tokenId) public view returns (string memory) {
        return assetData.getData(tokenId);
    }
    function transferOwnership(uint tokenId, address newOwner) public tokenExists(tokenId) onlyPurchaseDepartment {
        assetOwnership.initiateTransfer(tokenId, newOwner);
    }
    function acceptOwnership(uint tokenId) public tokenExists(tokenId) onlyPurchaseDepartment {
        assetOwnership.approveTransfer(tokenId);
    }
    function getOwnership(uint tokenId) public view tokenExists(tokenId) returns (address) {
        return assetOwnership.getCurrentOwner(tokenId);
    }

    function setTransferCondition(uint256 tokenId, string memory condition)public onlyPurchaseDepartment tokenExists(tokenId) {
        assetTransferConditions.setAssetCondition(tokenId, condition);
    }

    function getTransferCondition(uint tokenId) public view tokenExists(tokenId) returns (string memory) {
        return assetTransferConditions.getAssetCondition(tokenId);
    }

}