import streamlit as st
import requests
from web3 import Web3
import json
import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

st.set_page_config(page_title="ChainPack Upload", layout="centered")
st.title("📦 Upload ZIP & Publish to ChainPack")
st.markdown("This app uploads a `.zip` file to IPFS and publishes the metadata to your smart contract and Orkes microservice.")

# 🧠 Smart Contract Config
contract_address = Web3.to_checksum_address(os.getenv("CONTRACT_ADDRESS"))
private_key = os.getenv("PRIVATE_KEY")
account_address = Web3.to_checksum_address(os.getenv("ACCOUNT_ADDRESS"))
rpc_url = os.getenv("RPC_URL")  # e.g., http://127.0.0.1:8545
orkes_api_token = os.getenv("ORKES_API_TOKEN")

# Load ABI
with open("ChainPackABI.json") as f:
    contract_abi = json.load(f)

# Connect to Web3
web3 = Web3(Web3.HTTPProvider(rpc_url))
contract = web3.eth.contract(address=contract_address, abi=contract_abi)

# Upload UI
uploaded_file = st.file_uploader("Choose a ZIP file", type="zip")

package_name = st.text_input("📛 Package Name")
package_version = st.text_input("🔖 Version (e.g., 1.0.0)")

if uploaded_file and package_name and package_version:
    st.success("All fields ready! You can now upload.")

    if st.button("🚀 Upload to IPFS & Publish"):
        with st.spinner("Uploading to IPFS..."):
            files = {"file": (uploaded_file.name, uploaded_file.getvalue())}

            try:
                response = requests.post("http://127.0.0.1:5003/api/v0/add", files=files)

                if response.status_code == 200:
                    result = response.json()
                    cid = result["Hash"]
                    ipfs_url = f"https://ipfs.io/ipfs/{cid}"
                    st.success(f"✅ Uploaded to IPFS with CID: `{cid}`")
                    st.markdown(f"[🔗 View on IPFS Gateway]({ipfs_url})")

                    # 🔗 Orkes Microservice API Call
                    st.info("📡 Sending metadata to Orkes microservice...")
                    orkes_url = "https://play.orkes.io/api/workflow/publish_chainpack_package"
                    headers = {
                        "Content-Type": "application/json",
                        "Authorization": f"Bearer {orkes_api_token}"
                    }
                    payload = {
                        "name": package_name,
                        "version": package_version,
                        "cid": cid
                    }

                    try:
                        orkes_response = requests.post(orkes_url, headers=headers, json=payload)

                        if orkes_response.status_code == 200:
                            st.success("✅ Orkes microservice accepted the package!")
                            st.json(orkes_response.json())  # Optional: display Orkes response

                            # ✅ Blockchain Publish
                            st.info("⛓️ Publishing package to ChainPack smart contract...")

                            nonce = web3.eth.get_transaction_count(account_address)
                            txn = contract.functions.publishPackage(
                                package_name,
                                package_version,
                                cid
                            ).build_transaction({
                                'from': account_address,
                                'nonce': nonce,
                                'gas': 300000,
                                'gasPrice': web3.to_wei('20', 'gwei')
                            })

                            signed_txn = web3.eth.account.sign_transaction(txn, private_key=private_key)
                            tx_hash = web3.eth.send_raw_transaction(signed_txn.rawTransaction)

                            st.success(f"🎉 Transaction sent! Hash: `{tx_hash.hex()}`")
                            st.markdown(f"[🔍 View on Explorer](https://etherscan.io/tx/{tx_hash.hex()})")

                        else:
                            st.warning(f"⚠️ Orkes API returned {orkes_response.status_code}")
                            st.code(orkes_response.text)

                    except Exception as orkes_error:
                        st.error("❌ Failed to contact Orkes microservice.")
                        st.code(str(orkes_error))

                else:
                    st.error("❌ Upload failed. Is IPFS daemon running?")
                    st.code(response.text)

            except Exception as e:
                st.error("⚠️ Error during upload or publishing.")
                st.code(str(e))
else:
    st.warning("Please select a file and enter package details.")
