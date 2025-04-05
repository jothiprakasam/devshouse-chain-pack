from web3 import Web3
import json
# Example values (replace with actual input or dynamic code)
name = "v0-test"
version = "0.0.1"
cid = "QmWCGS46ohD84bsDs6ujCMyB8CPnwir5SzNecDbsJL6uTm"  # your uploaded IPFS hash

# Connect to local blockchain (e.g., Hardhat or Ganache)
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))

# Load ABI and contract
with open("ChainPackABI.json") as f:
    abi = json.load(f)

contract_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"  # Replace with your deployed contract address
contract = w3.eth.contract(address=contract_address, abi=abi)

# Your account (must be unlocked or have private key)
account = w3.eth.accounts[0]
w3.eth.default_account = account

# Build txn
txn = contract.functions.publishPackage(name, version, cid).build_transaction({
    "from": account,
    "nonce": w3.eth.get_transaction_count(account),
    "gas": 500000,
    "gasPrice": w3.to_wei("10", "gwei"),
})

# If you’re using private key
private_key = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"  # Replace with private key (DON'T expose in real apps)
signed_txn = w3.eth.account.sign_transaction(txn, private_key=private_key)

# Correct way to send it
tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)


# Wait for confirmation (optional)
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print("✅ Package published at tx:", tx_receipt.transactionHash.hex())
