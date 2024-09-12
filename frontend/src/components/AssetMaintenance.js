import React, { useState, useEffect } from 'react';
import { checkUserRoles } from '../utils/checkUserRole';
import { ethers } from 'ethers';
import { createWorkOrder, updateWorkOrder, getWorkOrders } from '../utils/workorderUtils';

const WorkorderComponent = ({ account, provider, isConnected }) => {
  const [roleStatus, setRoleStatus] = useState([]);
  const [workOrderDetails, setWorkOrderDetails] = useState('');
  const [workOrderIndex, setWorkOrderIndex] = useState('');
  const [workOrderStatus, setWorkOrderStatus] = useState(false);
  const [assetId, setAssetId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [workOrders, setWorkOrders] = useState([]);

  useEffect(() => {
    if (isConnected) {
      checkUserRoles(account, setRoleStatus, isConnected);
    }
  }, [isConnected, account]);

  const handleCreateWorkOrder = async () => {
    if (window.ethereum && isConnected && assetId && workOrderDetails) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const message = await createWorkOrder(signer, assetId, workOrderDetails);
        setStatusMessage(message);
      } catch (error) {
        setStatusMessage(error.message);
      }
    } else {
      setStatusMessage('Please provide all details.');
    }
  };

  const handleUpdateWorkOrder = async () => {
    if (window.ethereum && isConnected && assetId && workOrderIndex !== '' && workOrderDetails) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const message = await updateWorkOrder(signer, assetId, workOrderIndex, workOrderDetails, workOrderStatus);
        setStatusMessage(message);
      } catch (error) {
        setStatusMessage(error.message);
      }
    } else {
      setStatusMessage('Please provide all details.');
    }
  };

  const handleGetWorkOrders = async () => {
    if (window.ethereum && isConnected && assetId) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const orders = await getWorkOrders(provider, assetId);
        setWorkOrders(orders);
        setStatusMessage('Work orders retrieved successfully');
      } catch (error) {
        setStatusMessage(error.message);
      }
    } else {
      setStatusMessage('Please provide an asset ID.');
    }
  };

  return (
    <div className="WorkorderComponent">
      <h1>Work Order Management</h1>
      {isConnected ? (
        <div>
          <p>Connected as: {account}</p>
          {roleStatus.length === 0 && <p>Loading roles...</p>}
          {roleStatus.length > 0 && roleStatus.map((status, index) => (
            <p key={index}>{status}</p>
          ))}
          {roleStatus.includes('MAINTENANCE_DEP_ROLE') && (
            <div>
              <h3>Create Work Order</h3>
              <input
                type="number"
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                placeholder="Enter asset ID"
              />
              <input
                type="text"
                value={workOrderDetails}
                onChange={(e) => setWorkOrderDetails(e.target.value)}
                placeholder="Enter work order details"
              />
              <button onClick={handleCreateWorkOrder}>Create Work Order</button>

              <h3>Update Work Order</h3>
              <input
                type="number"
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                placeholder="Enter asset ID"
              />
              <input
                type="number"
                value={workOrderIndex}
                onChange={(e) => setWorkOrderIndex(e.target.value)}
                placeholder="Enter work order index"
              />
              <input
                type="text"
                value={workOrderDetails}
                onChange={(e) => setWorkOrderDetails(e.target.value)}
                placeholder="Enter new work order details"
              />
              <input
                type="checkbox"
                checked={workOrderStatus}
                onChange={(e) => setWorkOrderStatus(e.target.checked)}
              />
              <label>Completed</label>
              <button onClick={handleUpdateWorkOrder}>Update Work Order</button>

              <h3>Get Work Orders</h3>
              <input
                type="number"
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                placeholder="Enter asset ID"
              />
              <button onClick={handleGetWorkOrders}>Get Work Orders</button>
              <div>
                {workOrders.length > 0 && (
                  <ul>
                    {workOrders.map((order, index) => (
                      <li key={index}>
                        Details: {order.details}, Created: {order.isCreated ? 'Yes' : 'No'}, Completed: {order.isCompleted ? 'Yes' : 'No'}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <p>{statusMessage}</p>
            </div>
          )}
        </div>
      ) : (
        <p>Please connect your wallet.</p>
      )}
    </div>
  );
};

export default WorkorderComponent;