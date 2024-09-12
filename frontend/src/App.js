import React, { useState, lazy, Suspense } from 'react';
import ConnectWallet from './components/ConnectWallet';
import './App.css';

// Lazy load the components
const UserRoles = lazy(() => import('./components/UserRoles'));
const AdminRoleManagement = lazy(() => import('./components/AdminRoleManagement'));
const AssetManagement = lazy(() => import('./components/AssetManagement'));
const AssetMaintenance = lazy(() => import('./components/AssetMaintenance'));

const App = () => {
  const [account, setAccount] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const options = [
    { label: 'User Roles Management', key: 'UserRoles' },
    { label: 'Admin Role Management', key: 'AdminRoleManagement' },
    { label: 'Purchase Department', key: 'PurchaseDepartment' },
    { label: 'Maintenance Department', key: 'MaintenanceDepartment' },
  ];

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery)
  );

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
      case 'PurchaseDepartment':
        return (
          <Suspense fallback={<div>Loading Purchasing ...</div>}>
            <AssetManagement account={account} isConnected={isConnected}/>
          </Suspense>
        );
      case 'MaintenanceDepartment':
        return (
          <Suspense fallback={<div>Loading Maintenance...</div>}>
            <AssetMaintenance account={account} isConnected={isConnected}/>
          </Suspense>
        );
      default:
        return <div>Select an option from the sidebar.</div>;
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
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            {filteredOptions.map(option => (
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
