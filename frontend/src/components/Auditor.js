import React, { useState } from 'react';
import axios from 'axios';
import auditorModuleStyle from './Auditor.module.css';

const backendAddress = axios.create({
  baseURL: "http://127.0.0.1:5000"
});

// AssetRegistered Component
const AssetRegistered = () => {
  const [tokenId, setTokenId] = useState('');
  const [owner, setOwner] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const response = await backendAddress.get('/assets/registered', { query: { tokenId, owner } });
      setData(response.data.events);
      setError('');
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  return (
    <div className="AuditorComponent">
      <h2>Assets Registered</h2>
      <input
        type="text"
        placeholder="Asset ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Owner"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />
      <button onClick={fetchData}>Fetch Asset Registered</button>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            Asset ID: {item.tokenId}, Owner: {item.owner}, Details: {item.details}, Transfer Condition: {item.transferCondition}
          </li>
        ))}
      </ul>
    </div>
  );
};

// OwnershipTransfersInitiated Component
const OwnershipTransfersInitiated = () => {
  const [tokenId, setTokenId] = useState('');
  const [owner, setOwner] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const response = await backendAddress.get('/assets/initiated-ownership-transfers', { query: { tokenId, owner, newOwner } });
      setData(response.data.events);
      setError('');
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  return (
    <div className="AuditorComponent">
      <h2>Ownership Transfers Initiated</h2>
      <input
        type="text"
        placeholder="Asset ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Owner"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Owner"
        value={newOwner}
        onChange={(e) => setNewOwner(e.target.value)}
      />
      <button onClick={fetchData}>Fetch Ownership Transfers Initiated</button>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            Asset ID: {item.tokenId}, Owner: {item.owner}, New Owner: {item.newOwner}
          </li>
        ))}
      </ul>
    </div>
  );
};

// OwnershipTransfersAccepted Component
const OwnershipTransfersAccepted = () => {
  const [tokenId, setTokenId] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const response = await backendAddress.get('/assets/accepted-ownership-transfers', { query: { tokenId, newOwner } });
      setData(response.data.events);
      setError('');
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  return (
    <div className="AuditorComponent">
      <h2>Ownership Transfers Accepted</h2>
      <input
        type="text"
        placeholder="Asset ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Owner"
        value={newOwner}
        onChange={(e) => setNewOwner(e.target.value)}
      />
      <button onClick={fetchData}>Fetch Ownership Transfers Accepted</button>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            Asset ID: {item.tokenId}, New Owner: {item.newOwner}
          </li>
        ))}
      </ul>
    </div>
  );
};

// PastChangedTransferCondition Component
const PastChangedTransferCondition = () => {
  const [tokenId, setTokenId] = useState('');
  const [previousCondition, setPreviousCondition] = useState('');
  const [condition, setCondition] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const response = await backendAddress.get('/assets/changed-transfer-conditions', { query: { tokenId, previousCondition, condition } });
      setData(response.data.events);
      setError('');
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  return (
    <div className="AuditorComponent">
      <h2>Past Changed Transfer Condition</h2>
      <input
        type="text"
        placeholder="Asset ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Previous Condition"
        value={previousCondition}
        onChange={(e) => setPreviousCondition(e.target.value)}
      />
      <input
        type="text"
        placeholder="Condition"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
      />
      <button onClick={fetchData}>Fetch Past Changed Transfer Condition</button>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            Asset ID: {item.tokenId}, Previous Condition: {item.previousCondition}, Condition: {item.condition}
          </li>
        ))}
      </ul>
    </div>
  );
};

// WorkOrdersCreated Component
const WorkOrdersCreated = () => {
  const [tokenId, setTokenId] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const response = await backendAddress.get('/work-orders/created', { query: { tokenId } });
      setData(response.data.events);
      setError('');
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  return (
    <div className="AuditorComponent">
      <h2>Work Orders Created</h2>
      <input
        type="text"
        placeholder="Asset ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <button onClick={fetchData}>Fetch Work Orders Created</button>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            Asset ID: {item.tokenId}, Index: {item.index}, Details: {item.details}
          </li>
        ))}
      </ul>
    </div>
  );
};

// WorkOrdersUpdated Component
const WorkOrdersUpdated = () => {
  const [tokenId, setTokenId] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const response = await backendAddress.get('/work-orders/updated', { query: { tokenId } });
      setData(response.data.events);
      setError('');
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  return (
    <div className="AuditorComponent">
      <h2>Work Orders Updated</h2>
      <input
        type="text"
        placeholder="Asset ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <button onClick={fetchData}>Fetch Work Orders Updated</button>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            Asset ID: {item.tokenId}, Index: {item.index}, New Details: {item.newDetails}, Completed: {item.isCompleted.toString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

// AuditorsDashboard Component
const AuditorsDashboard = () => {
  return (
    <div className={auditorModuleStyle.AuditorComponent}>
      <AssetRegistered />
      <OwnershipTransfersInitiated />
      <OwnershipTransfersAccepted />
      <PastChangedTransferCondition />
      <WorkOrdersCreated />
      <WorkOrdersUpdated />
    </div>
  );
};

export { 
    AssetRegistered, 
    OwnershipTransfersInitiated, 
    OwnershipTransfersAccepted, 
    PastChangedTransferCondition, 
    WorkOrdersCreated, 
    WorkOrdersUpdated 
  };

export default AuditorsDashboard;
