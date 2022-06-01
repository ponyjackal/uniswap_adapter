import { ethers } from "hardhat";

async function main(): Promise<void> {
  const name = "TokenPOP";
  const symbol = "POP";
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy(name, symbol);

  await token.deployed();

  console.log(`TokenERC20 has been deployed with an address ${token.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
