/**
 * LiteForge Faucet Direct API Claim
 * 
 * Attempts to claim zkLTC directly via the LiteForge API without browser automation.
 * Uses the Caldera Metalayer cross-chain execution path.
 */

require('dotenv').config();
const { ethers } = require('/Users/jack/Projects/lester-labs/contracts/node_modules/ethers');

const FAUCET_URL = 'https://liteforge.hub.caldera.xyz';
const LITVM_RPC = 'https://liteforge.rpc.caldera.xyz/http';
const EXPLORER_API = 'https://liteforge.explorer.caldera.xyz/api?v=101';

const { execSync } = require('child_process');

async function httpRequest(method, url, data) {
  const http = require('https');
  return new Promise((resolve, reject) => {
    const body = data ? JSON.stringify(data) : '';
    const options = {
      hostname: new URL(url).hostname,
      path: new URL(url).pathname + new URL(url).search,
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(body ? { 'Content-Length': Buffer.byteLength(body) } : {})
      }
    };
    const req = http.request(options, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function tryClaim(address) {
  // Try different API endpoints on the LiteForge hub
  const endpoints = [
    { url: `${FAUCET_URL}/api/claim`, body: { address } },
    { url: `${FAUCET_URL}/api/zkltc/claim`, body: { address, chainId: 4441 } },
    { url: `${FAUCET_URL}/api/v1/faucet/claim`, body: { address, chainId: 4441 } },
    { url: `${FAUCET_URL}/api/claim/zkltc`, body: { address, chain: 4441 } },
  ];
  
  for (const ep of endpoints) {
    try {
      console.log(`Trying: ${ep.url}`);
      const res = await httpRequest('POST', ep.url, ep.body);
      console.log(`  Status: ${res.status}`);
      console.log(`  Body: ${res.body.slice(0, 200)}`);
      if (res.status === 200 && res.body.includes('success')) {
        console.log('✅ SUCCESS at', ep.url);
        return true;
      }
    } catch(e) {
      console.log(`  Error: ${e.message}`);
    }
  }
  return false;
}

async function tryFaucetViaRPC(address) {
  // The faucet is on Sepolia - try to interact with the cross-chain dispatcher directly
  const provider = new ethers.JsonRpcProvider(LITVM_RPC);
  
  // The burner contract (0x6e) handles cross-chain messages
  // Try to call it with claim data
  // Selector: 0xc9f95d32 = execute(bytes32,uint256,uint256,uint256,bytes)
  
  // Actually, the faucet dispenses tokens via the AnyTrust bridge
  // The canonical token contract on LitVM might have a mint function
  
  const wzkLTC = '0x93acc61fcdc2e3407A0c03450Adfd8aE78964948';
  const iface = new ethers.Interface([
    'function mint(address to, uint256 amount)'
  ]);
  
  try {
    const data = iface.encodeFunctionData('mint', [address, ethers.parseEther('1000')]);
    const result = await provider.call({ to: wzkLTC, data });
    console.log('✅ Mint call succeeded:', result);
    return true;
  } catch(e) {
    const revertReason = e.reason || e.message.split('\n')[0];
    console.log('❌ Mint call reverted:', revertReason);
  }
  return false;
}

async function findFaucetContract() {
  // Search the explorer for a contract named "Faucet" or similar
  const provider = new ethers.JsonRpcProvider(LITVM_RPC);
  
  // Check for any verified faucet contract
  // Try known pattern: 0xF471... or similar common faucet addresses on testnets
  
  const commonFaucetAddresses = [
    '0xf471d64f880600800620a60005a60007386ca116ebf0af682b27f9479a00d9abcd8ec1b38', // too random
  ];
  
  // Actually let me check the LitVM AnyTrust sequencer or bridge contract
  // On Arbitrum AnyTrust, thesequencer is managed by a rollup contract
  
  // Let me check the bridge contract on LitVM
  const bridgeAddr = '0x000000000000000000000000000000000000006e';
  const code = await provider.getCode(bridgeAddr);
  console.log('Bridge code length:', code.length, '(EOA if < 10 bytes)');
  
  // Check if there's a canonical token manager
  // The Metalayer cross-chain executor might have a faucet entry point
  
  // Try the metarouter contract on Sepolia (from network logs)
  const metarouterSepolia = '0x...'; // from the staging URL
  const sepoliaProvider = new ethers.JsonRpcProvider('https://rpc.sepolia.org');
  
  // Get the Sequenceror rollup contract on LitVM
  // The AnyTrust setup uses a delay buffer for data availability
  // This might have a way to trigger token minting
  
  return null;
}

async function main() {
  const address = process.env.FAUCET_CLAIM_ADDRESS || '0xDD221FBbCb0f6092AfE51183d964AA89A968eE13';
  
  console.log('🎯 LiteForge Faucet Direct Claim');
  console.log('Address:', address);
  console.log('');
  
  // Method 1: Try HTTP API endpoints
  console.log('=== Method 1: HTTP API endpoints ===');
  const apiWorked = await tryClaim(address);
  
  if (apiWorked) {
    console.log('\n✅ API claim succeeded!');
    return;
  }
  
  // Method 2: Try RPC call to canonical token mint
  console.log('\n=== Method 2: RPC mint attempt ===');
  await tryFaucetViaRPC(address);
  
  console.log('\n⚠️  Faucet requires wallet connection through browser.');
  console.log('   The browser-based flow uses Web3Modal to sign a cross-chain message.');
  console.log('   For automation, you would need a service wallet with pre-authorized signing.');
  console.log('');
  console.log('To run the browser-based claim:');
  console.log('  node scripts/auto_faucet.js');
}

main().catch(e => { console.error('Error:', e.message); process.exit(1); });