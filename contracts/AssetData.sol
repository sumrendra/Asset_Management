// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AssetData is Ownable {
    mapping(uint256 => string) private data;

    event DataAdded(uint256 indexed tokenId, string data);

    function addData(uint256 tokenId, string memory _data) public onlyOwner {
        data[tokenId] = _data;
        emit DataAdded(tokenId, _data);
    }

    function getData(uint256 tokenId) public view returns (string memory) {
        return data[tokenId];
    }
}
