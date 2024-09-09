// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract UserRoles is AccessControl {
    bytes32 public constant PURCHASING_DEP_ROLE = keccak256("PURCHASING_DEP_ROLE");
    bytes32 public constant MAINTENANCE_DEP_ROLE = keccak256("MAINTENANCE_DEP_ROLE");

    constructor(){
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); 
    }
    
}