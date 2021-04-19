import { FireblocksSDK } from "fireblocks-sdk";
import { EthersBridge, Chain } from "./src";
import { ethers, PopulatedTransaction } from "ethers";
import * as fs from "fs";

const CHAIN = Chain.ETH_NETWORK;
const JSONRPC_ENDPOINT = 'https://...'; // Change me - JSON/RPC endpoint for the required Ethereum ndoe
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Change me - Smart Contract address to be called
const CONTRACT_ABI = fs.readFileSync('./inxtoken_abi.json', "utf8"); // Change me - Smart Contract ABI to be called
const API_SECRET = fs.readFileSync('path_to_private_key_file', "utf8"); // Change me - Private key path to sign REST API request
const API_KEY = "00000000-0000-0000-0000-000000000000"; // Change me - UUID4 API Key given by Fireblocks Customer Support

async function processTransaction(bridge: EthersBridge, tx: PopulatedTransaction) {
    const res = await bridge.sendTransaction(tx);

    console.log("Waiting for the transaction to be signed and mined");

    const txHash = await bridge.waitForTxHash(res.id);

    console.log(`Transaction ${res.id} has been broadcast. TX Hash is ${txHash}`);
}

(async function() {
    const fireblocksApiClient = new FireblocksSDK(API_SECRET, API_KEY);

    const bridge = new EthersBridge({ 
        fireblocksApiClient,
        vaultAccountId: "0",
        contractAddress: CONTRACT_ADDRESS,
        chain: CHAIN
    });

    const provider = new ethers.providers.JsonRpcProvider(JSONRPC_ENDPOINT);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, );

    const tx: PopulatedTransaction = await contract.populateTransaction.approve("0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", "10000000000000000000"); // Change me - according to required contract call

    console.log("Sending trasnaction for signing");

    await processTransaction(bridge, tx);
}()).catch(err=> {
    console.log("error", err);
    process.exit(1);
});