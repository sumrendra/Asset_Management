import { ethers } from 'ethers';
import AssetArtifact from '../contracts/Asset.json';  // Import Asset contract ABI
import contractAddress from '../contracts/contract-address.json';  // Import contract addresses

// Initialize the Asset contract
const getAssetContract = (providerOrSigner) => {
  return new ethers.Contract(contractAddress.Asset, AssetArtifact.abi, providerOrSigner);
};

// Function to register a new asset
export const registerAsset = async (account, newAssetDetails, transferCondition, providerOrSigner) => {
  
  const assetContract = getAssetContract(providerOrSigner);
  try {
    const tx = await assetContract.registerAsset(account, newAssetDetails, transferCondition,{
      gasLimit: ethers.utils.hexlify(300000),
    });
    await tx.wait();
    return 'Asset registered successfully.';
  } catch (error) {
    console.error("Error registering asset:", error);
    throw new Error('Failed to register asset. Please try again.');
  }
};

// Function to fetch asset details
export const fetchAssetDetails = async (assetId, provider) => {
  const assetContract = getAssetContract(provider);
  try {
    const details = await assetContract.getAssetDetails(assetId);
    return details;
  } catch (error) {
    console.error("Error fetching asset details:", error);
    throw new Error('Failed to fetch asset details. Please try again.');
  }
};

// Function to transfer ownership of an asset
export const transferOwnership = async (assetId, newOwner, providerOrSigner) => {
  const assetContract = getAssetContract(providerOrSigner);
  try {
    const tx = await assetContract.transferOwnership(assetId, newOwner);
    await tx.wait();
    return 'Ownership transfer initiated successfully.';
  } catch (error) {
    console.error("Error transferring ownership:", error);
    throw new Error('Failed to transfer ownership. Please try again.');
  }
};

// Function to accept ownership of an asset
export const acceptOwnership = async (assetId, providerOrSigner) => {
  const assetContract = getAssetContract(providerOrSigner);
  try {
    const tx = await assetContract.acceptOwnership(assetId);
    await tx.wait();
    return 'Ownership accepted successfully.';
  } catch (error) {
    console.error("Error accepting ownership:", error);
    throw new Error('Failed to accept ownership. Please try again.');
  }
};

// Function to set transfer conditions for an asset
export const setTransferCondition = async (assetId, condition, providerOrSigner) => {
  const assetContract = getAssetContract(providerOrSigner);
  try {
    const tx = await assetContract.setTransferCondition(assetId, condition);
    await tx.wait();
    return 'Transfer condition updated successfully.';
  } catch (error) {
    console.error("Error setting transfer condition:", error);
    throw new Error('Failed to set transfer condition. Please try again.');
  }
};

// Function to get ownership details of an asset
export const getOwnership = async (assetId, provider) => {
  const assetContract = getAssetContract(provider);
  try {
    const owner = await assetContract.getOwnership(assetId);
    return owner;
  } catch (error) {
    console.error("Error fetching ownership details:", error);
    throw new Error('Failed to get ownership details. Please try again.');
  }
};

// Function to get transfer condition of an asset
export const getTransferCondition = async (assetId, provider) => {
  const assetContract = getAssetContract(provider);
  try {
    const condition = await assetContract.getTransferCondition(assetId);
    return condition;
  } catch (error) {
    console.error("Error fetching transfer condition:", error);
    throw new Error('Failed to fetch transfer condition. Please try again.');
  }
};
