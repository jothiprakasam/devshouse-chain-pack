export const CHAINPACK_ABI = [
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "string",
          name: "_version",
          type: "string",
        },
        {
          internalType: "string",
          name: "_ipfsHash",
          type: "string",
        },
      ],
      name: "publishPackage",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "getPackage",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          indexed: false,
          internalType: "string",
          name: "version",
          type: "string",
        },
        {
          indexed: false,
          internalType: "string",
          name: "ipfsHash",
          type: "string",
        },
        {
          indexed: true,
          internalType: "address",
          name: "author",
          type: "address",
        },
      ],
      name: "PackagePublished",
      type: "event",
    },
  ]
  
  // Replace with your actual deployed contract address
  export const CHAINPACK_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  
  