import { ethers } from 'ethers';
import UserRolesArtifact from '../contracts/UserRoles.json';
import contractAddress from '../contracts/contract-address.json';

export const checkAdminRole = async (account, setAdminStatus, setIsAdmin, isConnected) => {
  if (window.ethereum && isConnected) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const userRolesContract = new ethers.Contract(contractAddress.UserRoles, UserRolesArtifact.abi, signer);

      const isAdminRole = await userRolesContract.hasRole(ethers.constants.HashZero, account);

      setIsAdmin(isAdminRole);
      setAdminStatus(isAdminRole ? 'You have admin role.' : 'You do not have admin role.');
    } catch (error) {
      setAdminStatus('Failed to check admin role. Please try again.');
      console.error("Error checking admin role:", error);
    }
  }
};
