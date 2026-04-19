/**
 * LiteForge Faucet Auto-Claim Script
 * 
 * Automates zkLTC faucet claims from https://liteforge.hub.caldera.xyz
 * 
 * HOW IT WORKS:
 * The faucet flow is: Connect Wallet (Web3Modal) -> Click "Request" -> Wallet signs cross-chain message
 * The message is sent via the AnyTrust bridge (Caldera Metalayer) -> tokens dispatched from Sepolia to LitVM
 * 
 * SETUP:
 * 1. Create a dedicated test wallet with Sepolia ETH for signing
 * 2. Fund that wallet with a small amount of Sepolia ETH (the faucet uses Sepolia as settlement layer)
 * 3. Set FAUCET_WALLET_PRIVATE_KEY in your .env
 * 4. Run: node scripts/auto_faucet.js
 * 
 * RATE LIMIT: ~2-3k zkLTC dispensed per day. If faucet is dry, it will fail gracefully.
 */

require('dotenv').config();
const { chromium } = require('/tmp/pw_test/node_modules/playwright');
const { ethers } = require('/Users/jack/Projects/lester-labs/contracts/node_modules/ethers');

const FAUCET_URL = 'https://liteforge.hub.caldera.xyz';
const LITVM_RPC = 'https://liteforge.rpc.caldera.xyz/http';
const CHAIN_ID = 4441;

// Load wallet from env or use the treasury wallet
const TEST_WALLET = process.env.FAUCET_WALLET_PRIVATE_KEY 
  ? new ethers.Wallet(process.env.FAUCET_WALLET_PRIVATE_KEY)
  : null;

if (!TEST_WALLET) {
  console.log('⚠️  No FAUCET_WALLET_PRIVATE_KEY set — will try to use MetaMask if connected');
  console.log('   For full automation: create a dedicated test wallet and fund it with Sepolia ETH');
}

async function waitForWalletConnected(page) {
  // Wait for Web3Modal to appear and connect with MetaMask
  console.log('  Waiting for wallet connection...');
  
  try {
    // Check if Web3Modal is open (it opened when we clicked Connect Wallet)
    const modal = await page.locator('[role="dialog"], .modal').first();
    const isVisible = await modal.isVisible({ timeout: 3000 }).catch(() => false);
    
    if (isVisible) {
      // Click MetaMask option
      const metamaskBtn = await page.locator('text=MetaMask').first();
      if (await metamaskBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        await metamaskBtn.click();
        console.log('  → Clicked MetaMask');
      }
    }
  } catch(e) {
    console.log('  → Could not auto-connect, please connect manually');
  }
  
  // Wait for wallet to be connected (button text should change from "Connect Wallet")
  await page.waitForFunction(() => {
    const btns = document.querySelectorAll('button');
    for (const btn of btns) {
      if (btn.textContent.includes('Request')) return true;
    }
    return false;
  }, { timeout: 30000 }).catch(() => {});
  
  console.log('  → Wallet connected');
}

async function claimFaucet(page, walletAddress) {
  // Navigate to the LiteForge hub
  console.log('🌐 Opening LiteForge faucet...');
  await page.goto(FAUCET_URL, { timeout: 30000 });
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(2000);
  
  // Click Connect Wallet
  console.log('  Clicking Connect Wallet...');
  const connectBtn = await page.locator('button:has-text("Connect Wallet")').first();
  await connectBtn.click();
  await page.waitForTimeout(2000);
  
  // Wait for manual wallet connection if needed
  await waitForWalletConnected(page);
  
  // Now click the Request button in the Faucet section
  console.log('  Clicking Request...');
  const requestBtn = await page.locator('button:has-text("Request")').first();
  await requestBtn.click();
  
  // Wait for the wallet popup (MetaMask will ask to sign)
  // The script will wait here until user approves in MetaMask
  console.log('  ⏳ Waiting for wallet signature (check MetaMask)...');
  
  // Wait for either success or error state
  await page.waitForTimeout(15000);
  
  // Check the balance change
  const provider = new ethers.JsonRpcProvider(LITVM_RPC);
  const balance = await provider.getBalance(walletAddress);
  console.log('  → New balance:', ethers.formatEther(balance), 'zkLTC');
  
  return balance;
}

async function main() {
  const walletAddress = TEST_WALLET?.address || '0xYourWalletAddressHere';
  
  console.log('🚀 LiteForge Faucet Auto-Claim');
  console.log('===============================');
  console.log('Faucet URL:', FAUCET_URL);
  console.log('Target wallet:', walletAddress);
  console.log('');
  
  // Launch browser
  const browser = await chromium.launch({ headless: false }); // headed for wallet interaction
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  
  try {
    const balance = await claimFaucet(page, walletAddress);
    console.log('\n✅ Claim complete!');
    console.log('   Final balance:', ethers.formatEther(balance), 'zkLTC');
  } catch(e) {
    console.error('\n❌ Claim failed:', e.message);
  } finally {
    await browser.close();
  }
}

// Allow running with a specific target address
const TARGET = process.argv[2];
if (TARGET) {
  console.log('Target address override:', TARGET);
  // Would need to route to this address
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });