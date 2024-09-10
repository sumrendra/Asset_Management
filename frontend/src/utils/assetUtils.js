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
    const tx = await assetContract.registerAsset(account, newAssetDetails, transferCondition);
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
