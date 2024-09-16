import { ethers } from 'ethers';
import UserRolesArtifact from '../contracts/UserRoles.json';
import contractAddress from '../contracts/contract-address.json';
import { roles } from './roles';

export const checkUserRoles = async (account, setRoleStatus, isConnected) => {
  if (window.ethereum && isConnected) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const userRolesContract = new ethers.Contract(contractAddress.UserRoles, UserRolesArtifact.abi, signer);

      const roleStatuses = await Promise.all(
        roles.map(async (role) => {
          const roleHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(role.roleString));
          const hasRole = await userRolesContract.hasRole(roleHash, account);
          return hasRole ? `${role.roleString}` : null;
        })
      );

      const assignedRoles = roleStatuses.filter(status => status !== null);
      setRoleStatus(assignedRoles);
      // setRoleStatus(assignedRoles.length > 0 ? [`You have ${assignedRoles.join(', ')} role${assignedRoles.length > 1 ? "s" : ""}`] : ['You have no special roles.']);
    } catch (error) {
      setRoleStatus(['Failed to check roles. Please try again.']);
      console.error("Error checking roles:", error);
    }
  }
};
