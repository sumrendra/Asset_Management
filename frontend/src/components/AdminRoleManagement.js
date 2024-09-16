import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import UserRolesArtifact from '../contracts/UserRoles.json';
import contractAddress from '../contracts/contract-address.json';
import RoleRequests from './RoleRequests';
import './AdminRoleManagement.css';
import { checkAdminRole } from '../utils/checkAdminRole';
import { roles } from '../utils/roles';

const AdminRoleManagement = ({ account, isConnected }) => {
  const [adminStatus, setAdminStatus] = useState('');
  const [addressToManage, setAddressToManage] = useState('');
  const [roleAction, setRoleAction] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [roleString, setRoleString] = useState('');
  const contractABI = UserRolesArtifact.abi;

  useEffect(() => {
    if (isConnected) {
      checkAdminRole(account, setAdminStatus, setIsAdmin, isConnected);
    }
  }, [isConnected, account]);

  const handleRoleAction = async () => {
    if (window.ethereum && isConnected && addressToManage) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const userRolesContract = new ethers.Contract(contractAddress.UserRoles, contractABI, signer);

        const roleKeccak256 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(roleString));
        const hasRole = await userRolesContract.hasRole(roleKeccak256, addressToManage);

        if (roleAction === 'grant') {
          if (hasRole) {
            setAdminStatus(`User already has the ${roleString}.`);
            return;
          }
          const tx = await userRolesContract.grantRole(roleKeccak256, addressToManage);
          await tx.wait();
          setAdminStatus(`${roleString} granted successfully.`);
        } else if (roleAction === 'revoke') {
          if (!hasRole) {
            setAdminStatus(`User does not have the ${roleString} to revoke.`);
            return;
          }
          const tx = await userRolesContract.revokeRole(roleKeccak256, addressToManage);
          await tx.wait();
          setAdminStatus(`${roleString} revoked successfully.`);
        }
      } catch (error) {
        setAdminStatus('Failed to update role. Please try again.');
        console.error("Error updating role:", error);
      }
    }
  };

  const handleRoleChange = (e) => {
    const [action, roleString] = JSON.parse(e.target.value);
    setRoleAction(action);
    setRoleString(roleString);
  };

  return (
    <div className="AdminRoleManagement">
      <h1>Admin Role Management</h1>
      {adminStatus && <p>{adminStatus}</p>}
      {isAdmin && (
        <div>
          <input
            type="text"
            value={addressToManage}
            onChange={(e) => setAddressToManage(e.target.value)}
            placeholder="Enter address"
          />
          
          <h3>Select Role to Manage</h3>

          {roles.map((role) => (
            <div key={role.roleString}>
              <input
                type="radio"
                id={`grant-${role.roleString}`}
                name="roleAction"
                value={JSON.stringify(["grant", role.roleString])}
                checked={roleAction === 'grant' && roleString === role.roleString}
                onChange={handleRoleChange}
              />
              <label htmlFor={`grant-${role.roleString}`}>Grant {role.label}</label>
              
              <input
                type="radio"
                id={`revoke-${role.roleString}`}
                name="roleAction"
                value={JSON.stringify(["revoke", role.roleString])}
                checked={roleAction === 'revoke' && roleString === role.roleString}
                onChange={handleRoleChange}
              />
              <label htmlFor={`revoke-${role.roleString}`}>Revoke {role.label}</label>
            </div>
          ))}

          <button onClick={handleRoleAction} disabled={!isConnected || !addressToManage}>
            Execute
          </button>
        </div>
      )}
      <RoleRequests isAdmin={isAdmin} account={account} />
    </div>
  );
};

export default AdminRoleManagement;
