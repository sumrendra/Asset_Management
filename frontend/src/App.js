import React, { useState, lazy, Suspense } from 'react';
import ConnectWallet from './components/ConnectWallet';
import './App.css';

// Lazy load the components
const UserRoles = lazy(() => import('./components/UserRoles'));
const AdminRoleManagement = lazy(() => import('./components/AdminRoleManagement'));
const AssetManagement = lazy(() => import('./components/AssetManagement'));

const App = () => {
  const [account, setAccount] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const options = [
    { label: 'User Roles Management', key: 'UserRoles' },
    { label: 'Admin Role Management', key: 'AdminRoleManagement' },
    { label: 'Asset Management', key: 'AssetManagement' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'UserRoles':
        return (
          <Suspense fallback={<div>Loading User Roles...</div>}>
            <UserRoles account={account} isConnected={isConnected}/>
          </Suspense>
        );
      case 'AdminRoleManagement':
        return (
          <Suspense fallback={<div>Loading Admin Role Management...</div>}>
            <AdminRoleManagement account={account} isConnected={isConnected}/>
          </Suspense>
        );
      case 'AssetManagement':
        return (
          <Suspense fallback={<div>Loading Asset Management...</div>}>
            <AssetManagement account={account} isConnected={isConnected}/>
          </Suspense>
        );
      default:
        return (
          <div className="default-message">
            <span>Select an option from the sidebar.</span>
          </div>
        );
    }
  };

  return (
    <div className="App">
      {!isConnected ? (
        <div className="login">
          <ConnectWallet setAccount={setAccount} setIsConnected={setIsConnected} />
        </div>
      ) : (
        <div className="App-main">
          <div className="Sidebar">
            {options.map(option => (
              <button key={option.key} onClick={() => handleTabClick(option.key)}>
                {option.label}
              </button>
            ))}
          </div>
          <div className="Content">
            {renderContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;