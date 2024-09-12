import React, { useState, useEffect } from 'react';
import { checkUserRoles } from '../utils/checkUserRole';
import { registerAsset, fetchAssetDetails } from '../utils/assetUtils';  // Import utility functions
import './AssetManagement.css';
import { ethers } from 'ethers';

const AssetManagement = ({ account, isConnected }) => {
  const [roleStatus, setRoleStatus] = useState([]);
  const [assetDetails, setAssetDetails] = useState('');
  const [assetId, setAssetId] = useState('');
  const [newAssetDetails, setNewAssetDetails] = useState('');
  const [transferCondition, setTransferCondition] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (isConnected) {
      checkUserRoles(account, setRoleStatus, isConnected);
    }
  }, [isConnected, account]);

  const handleRegisterAsset = async () => {
    if (window.ethereum && isConnected && newAssetDetails && transferCondition) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        const message = await registerAsset(account, newAssetDetails, transferCondition, signer);
        setStatusMessage(message);
      } catch (error) {
        setStatusMessage(error.message);
      }
    } else {
      setStatusMessage('Please provide all details.');
    }
  };

  const handleFetchAssetDetails = async () => {
    if (window.ethereum && isConnected && assetId) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const details = await fetchAssetDetails(assetId, provider);
        setAssetDetails(details);
      } catch (error) {
        setStatusMessage(error.message);
      }
    } else {
      setStatusMessage('Please provide an asset ID.');
    }
  };

  return (
    <div className="AssetManagement">
      <h1>Asset Management</h1>
      {isConnected ? (
        <div>
          <p>Connected as: {account}</p>
          {roleStatus.length === 0 && <p>Loading roles...</p>}
          {roleStatus.length > 0 && roleStatus.map((status, index) => (
            <p key={index}>{status}</p>
          ))}
          {roleStatus.includes('PURCHASING_DEP_ROLE') && (
            <div>
              <h3>Register New Asset</h3>
              <input
                type="text"
                value={newAssetDetails}
                onChange={(e) => setNewAssetDetails(e.target.value)}
                placeholder="Enter asset details"
              />
              <input
                type="text"
                value={transferCondition}
                onChange={(e) => setTransferCondition(e.target.value)}
                placeholder="Enter transfer condition"
              />
              <button onClick={handleRegisterAsset}>
                Register Asset
              </button>

              <h3>Fetch Asset Details</h3>
              <input
                type="number"
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                placeholder="Enter asset ID"
              />
              <button onClick={handleFetchAssetDetails}>
                Fetch Details
              </button>
              {assetDetails && <p>Asset Details: {assetDetails}</p>}
            </div>
          )}
          {statusMessage && <p>{statusMessage}</p>}
        </div>
      ) : (
        <p>Please connect your wallet.</p>
      )}
    </div>
  );
};

export default AssetManagement;
