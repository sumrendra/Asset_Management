const fs = require('fs');
const path = require('path');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy UserRoles contract
  const UserRoles = await ethers.getContractFactory("UserRoles");
  const userRoles = await UserRoles.deploy();
  await userRoles.deployed();
  console.log("UserRoles contract deployed to:", userRoles.address);

  // Deploy Asset contract, passing the UserRoles address
  const Asset = await ethers.getContractFactory("Asset");
  const asset = await Asset.deploy(userRoles.address);
  await asset.deployed();
  console.log("Asset contract deployed to:", asset.address);

  // Save the contract addresses and ABIs to the frontend
  saveFrontendFiles(userRoles, asset);
}

function saveFrontendFiles(userRoles, asset) {
  const contractsDir = path.join(__dirname, '..', 'frontend', 'src', 'contracts');

  // Create the directory if it doesn't exist
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  // Save the contract addresses
  fs.writeFileSync(
    path.join(contractsDir, 'contract-address.json'),
    JSON.stringify({ 
      UserRoles: userRoles.address, 
      Asset: asset.address 
    }, undefined, 2)
  );

  // Save the ABIs
  const UserRolesArtifact = artifacts.readArtifactSync("UserRoles");
  const AssetArtifact = artifacts.readArtifactSync("Asset");

  fs.writeFileSync(
    path.join(contractsDir, 'UserRoles.json'),
    JSON.stringify(UserRolesArtifact, null, 2)
  );

  fs.writeFileSync(
    path.join(contractsDir, 'Asset.json'),
    JSON.stringify(AssetArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
