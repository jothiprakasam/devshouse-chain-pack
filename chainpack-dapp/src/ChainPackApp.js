import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import ChainPackABI from "./abi/ChainPack.json"; // Make sure ABI is correct

const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // Update this for deployed address

function ChainPackApp() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [packageInfo, setPackageInfo] = useState("");
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);

        const _provider = new BrowserProvider(window.ethereum);
        const signer = await _provider.getSigner();
        const _contract = new Contract(CONTRACT_ADDRESS, ChainPackABI.abi, signer);

        setProvider(_provider);
        setContract(_contract);
      } catch (error) {
        console.error("Connection failed:", error);
      }
    } else {
      alert("MetaMask not found!");
    }
  };

  const fetchPackageInfo = async () => {
    if (!contract) return;
    try {
      const packageName = "example-package";  // Change this to a real package name stored in your contract
      const index = 0; // Index of the package
  
      const result = await contract.getPackage(packageName, index);
  
      setPackageInfo(`
        Name: ${result[0]}
        Version: ${result[1]}
        IPFS Hash: ${result[2]}
        Author: ${result[3]}
        Timestamp: ${new Date(result[4] * 1000).toLocaleString()}
      `);
    } catch (err) {
      console.error("Error fetching package:", err);
    }
  };
  
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">📦 ChainPack DApp</h1>
      {walletAddress ? (
        <div>
          <p className="mb-2">Connected Wallet: {walletAddress}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={fetchPackageInfo}
          >
            Fetch Package Info
          </button>
          {packageInfo && <p className="mt-4 break-words">Package Info: {packageInfo}</p>}
        </div>
      ) : (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={connectWallet}
        >
          Connect MetaMask
        </button>
      )}
    </div>
  );
}

export default ChainPackApp;
