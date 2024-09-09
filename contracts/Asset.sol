// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./AssetData.sol";
import "./AssetTransferConditions.sol";

interface IUserRoles {
    function hasRole(bytes32 role, address account) external view returns (bool);
    function PURCHASING_DEP_ROLE() external view returns (bytes32);
}

contract Asset is ERC721{

    uint256 public nextTokenId;
    
    IUserRoles public userRoles;
    AssetData public assetData;
    AssetTransferConditions public assetTransferConditions;

    constructor(address _userRoles) ERC721("Asset", "ASSET") {
        userRoles = IUserRoles(_userRoles);
        assetData = new AssetData();
        assetTransferConditions = new AssetTransferConditions();
    }

    modifier onlyPurchaseDepartment() {
        require(userRoles.hasRole(userRoles.PURCHASING_DEP_ROLE(), msg.sender), "Caller is not an asset manager");
        _;
    }

    function registerAsset(address owner, string memory details, string memory transferCondition) public onlyPurchaseDepartment returns (bool) {
        uint tokenId = nextTokenId;
        _mint(owner, tokenId);
        assetData.addData(tokenId, details);
        assetTransferConditions.setAssetCondition(tokenId, transferCondition);
        nextTokenId++;
        return true;
    }
    function getAssetDetails(uint tokenId) public view returns (string memory) {
        return assetData.getData(tokenId);
    }

}