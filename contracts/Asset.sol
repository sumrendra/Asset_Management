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
contract Asset is ERC721 {
    uint256 public nextTokenId;
    IUserRoles public userRoles;
    AssetData public assetData;
    AssetOwnership public assetOwnership;
    AssetTransferConditions public assetTransferConditions;
    event AssetRegistered(uint256 indexed tokenId, address indexed owner, string details, string transferCondition);
    event OwnershipTransferredInitiated(address indexed owner, uint256 indexed tokenId, address indexed newOwner);
    event OwnershipTransferredAccepted(uint256 indexed tokenId, address indexed newOwner);
    event TransferConditionSet(uint256 indexed tokenId, string condition);
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
        emit AssetRegistered(tokenId, owner, details, transferCondition);
        nextTokenId++;
        return true;
    }
    function transferOwnership(uint tokenId, address newOwner) public tokenExists(tokenId) onlyPurchaseDepartment {
        assetOwnership.initiateTransfer(tokenId, newOwner);
        emit OwnershipTransferredInitiated(assetOwnership.getCurrentOwner(tokenId),tokenId, newOwner);
    }
    function acceptOwnership(uint tokenId) public tokenExists(tokenId) onlyPurchaseDepartment {
        assetOwnership.approveTransfer(tokenId);
        emit OwnershipTransferredAccepted(tokenId, assetOwnership.getCurrentOwner(tokenId));
    }
    function setTransferCondition(uint256 tokenId, string memory condition) public onlyPurchaseDepartment tokenExists(tokenId) {
        assetTransferConditions.setAssetCondition(tokenId, condition);
        emit TransferConditionSet(tokenId, condition);
    }
}