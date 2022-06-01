import { ethers } from "hardhat";

async function main(): Promise<void> {
  const Adapter = await ethers.getContractFactory("UniswapAdapter");
  const adapter = await Adapter.deploy();

  await adapter.deployed();

  console.log(
    `UniswapAdapter has been deployed with an address ${adapter.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
