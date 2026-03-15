import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  // --- TokenFactory ---
  const TokenFactory = await ethers.getContractFactory("TokenFactory");
  const tokenFactory = await TokenFactory.deploy(50000000000000000n); // 0.05 ETH
  await tokenFactory.waitForDeployment();
  const tokenFactoryAddress = await tokenFactory.getAddress();
  console.log("TokenFactory deployed to:", tokenFactoryAddress);

  // --- LiquidityLocker ---
  const LiquidityLocker = await ethers.getContractFactory("LiquidityLocker");
  const liquidityLocker = await LiquidityLocker.deploy(30000000000000000n); // 0.03 ETH
  await liquidityLocker.waitForDeployment();
  const liquidityLockerAddress = await liquidityLocker.getAddress();
  console.log("LiquidityLocker deployed to:", liquidityLockerAddress);

  // --- VestingFactory ---
  const VestingFactory = await ethers.getContractFactory("VestingFactory");
  const vestingFactory = await VestingFactory.deploy(30000000000000000n); // 0.03 ETH
  await vestingFactory.waitForDeployment();
  const vestingFactoryAddress = await vestingFactory.getAddress();
  console.log("VestingFactory deployed to:", vestingFactoryAddress);

  // --- Disperse ---
  const Disperse = await ethers.getContractFactory("Disperse");
  const disperse = await Disperse.deploy();
  await disperse.waitForDeployment();
  const disperseAddress = await disperse.getAddress();
  console.log("Disperse deployed to:", disperseAddress);

  // --- ILOFactory ---
  const ILOFactory = await ethers.getContractFactory("ILOFactory");
  const iloFactory = await ILOFactory.deploy(
    "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // Uniswap V2 router (Arbitrum Sepolia proxy)
    deployer.address, // treasury — replace with multisig in production
    200,              // 2% platform fee
    ethers.parseEther("0.03") // 0.03 ETH creation fee
  );
  await iloFactory.waitForDeployment();
  const iloFactoryAddress = await iloFactory.getAddress();
  console.log("ILOFactory deployed to:", iloFactoryAddress);

  // --- Write deployed-addresses.json ---
  const addresses = {
    TokenFactory: tokenFactoryAddress,
    LiquidityLocker: liquidityLockerAddress,
    VestingFactory: vestingFactoryAddress,
    Disperse: disperseAddress,
    ILOFactory: iloFactoryAddress,
    network: (await ethers.provider.getNetwork()).name,
    chainId: Number((await ethers.provider.getNetwork()).chainId),
    deployedAt: new Date().toISOString(),
    deployer: deployer.address,
  };

  const outputPath = path.join(__dirname, "..", "deployed-addresses.json");
  fs.writeFileSync(outputPath, JSON.stringify(addresses, null, 2));
  console.log("\nDeployed addresses written to deployed-addresses.json");
  console.log("\nSummary:");
  console.log("  TokenFactory:    ", tokenFactoryAddress);
  console.log("  LiquidityLocker: ", liquidityLockerAddress);
  console.log("  VestingFactory:  ", vestingFactoryAddress);
  console.log("  Disperse:        ", disperseAddress);
  console.log("  ILOFactory:      ", iloFactoryAddress);
  console.log("\nNext: copy these addresses into src/lib/contracts/ in the frontend.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
