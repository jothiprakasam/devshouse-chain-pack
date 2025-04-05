from flask import Flask, request, jsonify
from web3 import Web3
import json

app = Flask(__name__)

# Setup web3 connection
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))  # Hardhat or Ganache

# Load ABI
with open("ChainPackABI.json") as f:
    abi = json.load(f)

# Replace with deployed contract address
contract_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
contract = w3.eth.contract(address=contract_address, abi=abi)

# Replace with your private key (NEVER expose this publicly!)
private_key = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
account = w3.eth.account.from_key(private_key).address

@app.route("/publish", methods=["POST"])
def publish():
    data = request.json
    name = data.get("name")
    version = data.get("version")
    cid = data.get("cid")

    try:
        nonce = w3.eth.get_transaction_count(account)
        txn = contract.functions.publishPackage(name, version, cid).build_transaction({
            "from": account,
            "nonce": nonce,
            "gas": 500000,
            "gasPrice": w3.to_wei("10", "gwei")
        })

        signed_txn = w3.eth.account.sign_transaction(txn, private_key=private_key)
        tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

        return jsonify({
            "status": "success",
            "txHash": receipt.transactionHash.hex()
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

if __name__ == "__main__":
    app.run(port=5000)
