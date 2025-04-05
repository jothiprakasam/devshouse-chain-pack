const hre = require("hardhat");

async function main() {
  const ChainPack = await hre.ethers.getContractFactory("ChainPack");
  const chainPack = await ChainPack.deploy(); // deploys the contract

  await chainPack.waitForDeployment(); // ✅ correct for recent Hardhat/Ethers versions

  const deployedAddress = await chainPack.getAddress(); // ✅ get deployed contract address
  console.log("✅ ChainPack deployed at:", deployedAddress);
}

main().catch((error) => {
  console.error("❌ Error deploying contract:", error);
  process.exitCode = 1;
});
