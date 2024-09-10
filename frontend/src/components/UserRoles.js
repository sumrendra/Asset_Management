// src/components/UserRoles.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { roles } from '../utils/roles';
import { checkUserRoles } from '../utils/checkUserRole';
import './UserRoles.css';

const UserRoles = ({ account, isConnected }) => {
  const [roleStatus, setRoleStatus] = useState([]);

  useEffect(() => {
    if (isConnected) {
      checkUserRoles(account, setRoleStatus, isConnected);
    }
  }, [isConnected, account]);

  const requestRole = async (roleString) => {
    if (window.ethereum && isConnected) {
      try {
        const response = await axios.post('http://localhost:5000/request-role', {
          account: account,
          role: roleString
        });
  
        if (response.data.success) {
          setRoleStatus([response.data.message]);
        } else {
          setRoleStatus(['Failed to request role.']);
        }
      } catch (error) {
        setRoleStatus(['Failed to request role. Please try again.']);
        console.error("Error requesting role:", error);
      }
    }
  };

  return (
    <div className="UserRoles">
      <h1>User Roles Management</h1>
      {isConnected && (
        <div>
          <p>Connected as: {account}</p>
          
          <p>{roleStatus.length > 0 ? [`You have ${roleStatus.join(', ')} role${roleStatus.length > 1 ? "s" : ""}`] : ['You have no special roles.']}</p>
          {roles.map((role) => (
            <button key={role.roleString} onClick={() => requestRole(role.roleString)}>
              Request {role.label} Role
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRoles;
