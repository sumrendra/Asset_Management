// src/utils/workorderUtils.js
import { ethers } from 'ethers';
import AssetWorkorderArtifact from '../contracts/AssetWorkorder.json';  // Import Asset contract ABI
import contractAddress from '../contracts/contract-address.json';  // Import contract addresses

export const getAssetWorkorderContract = (providerOrSigner) => {
 return new ethers.Contract(contractAddress.AssetWorkorder, AssetWorkorderArtifact.abi, providerOrSigner);
};

export const createWorkOrder = async (providerOrSigner, assetId, details) => {
  try {
    const workOrderContract = getAssetWorkorderContract(providerOrSigner);
    const tx = await workOrderContract.createWorkOrder(assetId, details);
    await tx.wait();
    return 'Work order created successfully';
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

export const updateWorkOrder = async (providerOrSigner, assetId, index, newDetails, isCompleted) => {
  try {
    const workOrderContract = getAssetWorkorderContract(providerOrSigner);
    const tx = await workOrderContract.updateWorkOrder(assetId, index, newDetails, isCompleted);
    await tx.wait();
    return 'Work order updated successfully';
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

export const getWorkOrders = async (providerOrSigner, assetId) => {
  try {
    const workOrderContract = getAssetWorkorderContract(providerOrSigner);
    const workOrders = await workOrderContract.getWorkOrders(assetId);
    return workOrders;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};
