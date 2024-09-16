import React, { useState, useEffect } from 'react';
import { checkUserRoles } from '../utils/checkUserRole';
import { 
  registerAsset, 
  fetchAssetDetails, 
  transferOwnership, 
  acceptOwnership, 
  setTransferCondition, 
  getOwnership, 
  getTransferCondition 
} from '../utils/assetUtils';
import { ethers } from 'ethers';
import './AssetManagement.css';
import {
   AssetRegistered,
   OwnershipTransfersInitiated,
   OwnershipTransfersAccepted,
   PastChangedTransferCondition
   } from './Auditor';

// Component for Registering an Asset
const RegisterAsset = ({ account, isConnected }) => {
  const [newAssetDetails, setNewAssetDetails] = useState('');
  const [transferCondition, setTransferConditionState] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

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

  return (
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
        onChange={(e) => setTransferConditionState(e.target.value)}
        placeholder="Enter transfer condition"
      />
      <button onClick={handleRegisterAsset}>Register Asset</button>
      <p>{statusMessage}</p>
    </div>
  );
};

// Component for Fetching Asset Details
const FetchAssetDetails = ({ isConnected }) => {
  const [assetId, setAssetId] = useState('');
  const [assetDetails, setAssetDetails] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

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
    <div>
      <h3>Fetch Asset Details</h3>
      <input
        type="number"
        value={assetId}
        onChange={(e) => setAssetId(e.target.value)}
        placeholder="Enter asset ID"
      />
      <button onClick={handleFetchAssetDetails}>Fetch Details</button>
      {assetDetails && <p>Asset Details: {assetDetails}</p>}
      <p>{statusMessage}</p>
    </div>
  );
};

// Component for Transferring Ownership
const TransferOwnership = ({ isConnected }) => {
  const [assetId, setAssetId] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleTransferOwnership = async () => {
    if (window.ethereum && isConnected && assetId && newOwner) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const message = await transferOwnership(assetId, newOwner, signer);
        setStatusMessage(message);
      } catch (error) {
        setStatusMessage(error.message);
      }
    } else {
      setStatusMessage('Please provide all details.');
    }
  };

  return (
    <div>
      <h3>Transfer Ownership</h3>
      <input
        type="number"
        value={assetId}
        onChange={(e) => setAssetId(e.target.value)}
        placeholder="Enter asset ID"
      />
      <input
        type="text"
        value={newOwner}
        onChange={(e) => setNewOwner(e.target.value)}
        placeholder="Enter new owner's address"
      />
      <button onClick={handleTransferOwnership}>Transfer Ownership</button>
      <p>{statusMessage}</p>
    </div>
  );
};

// Component for Accepting Ownership
const AcceptOwnership = ({ isConnected }) => {
  const [assetId, setAssetId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleAcceptOwnership = async () => {
    if (window.ethereum && isConnected && assetId) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const message = await acceptOwnership(assetId, signer);
        setStatusMessage(message);
      } catch (error) {
        setStatusMessage(error.message);
      }
    } else {
      setStatusMessage('Please provide an asset ID.');
    }
  };

  return (
    <div>
      <h3>Accept Ownership</h3>
      <input
        type="number"
        value={assetId}
        onChange={(e) => setAssetId(e.target.value)}
        placeholder="Enter asset ID"
      />
      <button onClick={handleAcceptOwnership}>Accept Ownership</button>
      <p>{statusMessage}</p>
    </div>
  );
};

// Component for Setting Transfer Condition
const SetTransferCondition = ({ isConnected }) => {
  const [assetId, setAssetId] = useState('');
  const [transferCondition, setTransferConditionState] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSetTransferCondition = async () => {
    if (window.ethereum && isConnected && assetId && transferCondition) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const message = await setTransferCondition(assetId, transferCondition, signer);
        setStatusMessage(message);
      } catch (error) {
        setStatusMessage(error.message);
      }
    } else {
      setStatusMessage('Please provide all details.');
    }
  };

  return (
    <div>
      <h3>Set Transfer Condition</h3>
      <input
        type="number"
        value={assetId}
        onChange={(e) => setAssetId(e.target.value)}
        placeholder="Enter asset ID"
      />
      <input
        type="text"
        value={transferCondition}
        onChange={(e) => setTransferConditionState(e.target.value)}
        placeholder="Enter transfer condition"
      />
      <button onClick={handleSetTransferCondition}>Set Condition</button>
      <p>{statusMessage}</p>
    </div>
  );
};

// Component for Getting Ownership
const GetOwnership = ({ isConnected }) => {
  const [assetId, setAssetId] = useState('');
  const [assetDetails, setAssetDetails] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleGetOwnership = async () => {
    if (window.ethereum && isConnected && assetId) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const owner = await getOwnership(assetId, provider);
        setAssetDetails(owner);
      } catch (error) {
        setStatusMessage(error.message);
      }
    } else {
      setStatusMessage('Please provide an asset ID.');
    }
  };

  return (
    <div>
      <h3>Get Ownership</h3>
      <input
        type="number"
        value={assetId}
        onChange={(e) => setAssetId(e.target.value)}
        placeholder="Enter asset ID"
      />
      <button onClick={handleGetOwnership}>Get Ownership</button>
      {assetDetails && <p>Ownership: {assetDetails}</p>}
      <p>{statusMessage}</p>
    </div>
  );
};

// Component for Getting Transfer Condition
const GetTransferCondition = ({ isConnected }) => {
  const [assetId, setAssetId] = useState('');
  const [assetDetails, setAssetDetails] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleGetTransferCondition = async () => {
    if (window.ethereum && isConnected && assetId) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const condition = await getTransferCondition(assetId, provider);
        setAssetDetails(condition);
      } catch (error) {
        setStatusMessage(error.message);
      }
    } else {
      setStatusMessage('Please provide an asset ID.');
    }
  };

  return (
    <div>
      <h3>Get Transfer Condition</h3>
      <input
        type="number"
        value={assetId}
        onChange={(e) => setAssetId(e.target.value)}
        placeholder="Enter asset ID"
      />
      <button onClick={handleGetTransferCondition}>Get Condition</button>
      {assetDetails && <p>Transfer Condition: {assetDetails}</p>}
      <p>{statusMessage}</p>
    </div>
  );
};

// Main AssetManagement Component
const AssetManagement = ({ account, isConnected }) => {
  const [roleStatus, setRoleStatus] = useState([]);

  useEffect(() => {
    if (isConnected) {
      checkUserRoles(account, setRoleStatus, isConnected);
    }
  }, [isConnected, account]);

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
              <RegisterAsset account={account} isConnected={isConnected} />
              <AssetRegistered/>
              {/* <FetchAssetDetails isConnected={isConnected} /> */}
              <TransferOwnership isConnected={isConnected} />
              <OwnershipTransfersInitiated />
              <AcceptOwnership isConnected={isConnected} />
              <OwnershipTransfersAccepted />
              <GetTransferCondition isConnected={isConnected} />
              <PastChangedTransferCondition />
              <SetTransferCondition isConnected={isConnected} />
              <GetOwnership isConnected={isConnected} />
              
            </div>
          )}
        </div>
      ) : (
        <p>Please connect your wallet.</p>
      )}
    </div>
  );
};

export default AssetManagement;
