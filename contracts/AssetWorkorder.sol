// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IUserRoles {
    function hasRole(bytes32 role, address account) external view returns (bool);
    function MAINTENANCE_DEP_ROLE() external view returns (bytes32);
}

interface IAsset {
    function ownerOf(uint256 tokenId) external view returns (address);
}

contract AssetWorkorder {
    IUserRoles public userRoles;
    IAsset public asset;

    struct WorkOrder {
        string details;
        bool isCreated;
        bool isCompleted;
    }

    mapping(uint256 => WorkOrder[]) private workOrders;

    event WorkOrderCreated(uint256 indexed tokenId, uint256 index, string details);
    event WorkOrderUpdated(uint256 indexed tokenId, uint256 index, string newDetails, bool isCompleted);

    constructor(address _userRoles, address _asset) {
        userRoles = IUserRoles(_userRoles);
        asset = IAsset(_asset);
    }

    modifier onlyMaintenanceDepartment() {
        require(userRoles.hasRole(userRoles.MAINTENANCE_DEP_ROLE(), msg.sender), "Caller is not maintenance staff");
        _;
    }

    modifier assetExists(uint256 tokenId) {
        require(asset.ownerOf(tokenId) != address(0), "Asset does not exist");
        _;
    }

    function createWorkOrder(uint256 tokenId, string memory details) public onlyMaintenanceDepartment assetExists(tokenId) {
        workOrders[tokenId].push(WorkOrder(details, true, false));
        emit WorkOrderCreated(tokenId, workOrders[tokenId].length-1, details);
    }

    function updateWorkOrder(uint256 tokenId, uint256 index, string memory newDetails, bool isCompleted) public onlyMaintenanceDepartment assetExists(tokenId) {
        require(index < workOrders[tokenId].length, "Invalid index");
        workOrders[tokenId][index].details = newDetails;
        workOrders[tokenId][index].isCompleted = isCompleted;
        emit WorkOrderUpdated(tokenId, index, newDetails, isCompleted);
    }

    function getWorkOrders(uint256 tokenId) public view assetExists(tokenId) returns (WorkOrder[] memory) {
        return workOrders[tokenId];
    }
}
