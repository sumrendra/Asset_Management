import React, { useState } from 'react';
import { ethers } from 'ethers';
import './ConnectWallet.css';

const ConnectWallet = ({ setAccount, setIsConnected }) => {
  const [status, setStatus] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setIsConnected(true);
        setStatus('Wallet connected.');
      } catch (error) {
        setStatus('Failed to connect wallet. Please try again.');
        console.error("Error connecting to wallet:", error);
      }
    } else {
      setStatus('MetaMask is not installed. Please install it to use this app.');
    }
  };

  return (
    <div className="connect-wallet-container">
      <h1>Connect Your Wallet</h1>
      <button onClick={connectWallet}>
        <span>Connect with MetaMask</span>
      </button>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default ConnectWallet;
