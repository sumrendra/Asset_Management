import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RoleRequests.css';
import { backendHttpServer, backendWsServer } from '../config';

const RoleRequests = ({ isAdmin, account }) => {
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    if (isAdmin && account) {
      fetchRoleRequests();
      setupWebSocket();
    }

    // Cleanup WebSocket connection when the component is unmounted
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [isAdmin, account]);

  const fetchRoleRequests = async () => {
    try {
      const response = await axios.get(`${backendHttpServer}/role-requests`, {
        headers: {
          'account': account, // Ensure the account address is included in the headers
        },
      });
      setRequests(response.data.requests);
    } catch (error) {
      setStatus('Failed to fetch role requests. Please try again.');
      console.error('Error fetching role requests:', error);
    }
  };

  const setupWebSocket = () => {
    const websocket = new WebSocket(`${backendWsServer}/?account=${account}`);

    websocket.onopen = () => {
      console.log('Connected to WebSocket server');
      setWs(websocket);
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.requests) {
        setRequests(data.requests);
      }
    };

    websocket.onclose = () => {
      console.log('WebSocket connection closed');
      setWs(null);
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setStatus('WebSocket error. Please try again later.');
    };
  };

  return (
    <div className="RoleRequests">
      <h2>Pending Role Requests</h2>
      {status && <p className="status-message">{status}</p>}
      {requests.length > 0 ? (
        <div className="requests-container">
          {requests.map((request, index) => (
            <div key={index} className="request-item">
              <strong>Address:</strong> {request.account} <br />
              <strong>Requested Role:</strong> {request.role}
            </div>
          ))}
        </div>
      ) : (
        <p className="no-requests">No pending role requests.</p>
      )}
    </div>
  );
};

export default RoleRequests;