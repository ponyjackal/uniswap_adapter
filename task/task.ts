import { task } from "hardhat/config";

task("get", "Get liquidity amount")
  .addParam("pair", "pair address")
  .setAction(async ({ pair }, { ethers }) => {
    const adapter = await ethers.getContractAt(
      "UniswapAdapter",
      process.env.ADAPTER_ADDRESS as string
    );

    const liquidity = await adapter.getLiquidity(pair);

    console.log(`Liquidity amount ${liquidity}`);
  });

task("pair", "Get the address of a pair")
  .addParam("tokenA", "address of token A")
  .addParam("tokenB", "address of token B")
  .setAction(async ({ tokenA, tokenB }, { ethers }) => {
    const adapter = await ethers.getContractAt(
      "UniswapAdapter",
      process.env.ADAPTER_ADDRESS as string
    );

    const pair = await adapter.getPair(tokenA, tokenB);

    console.log(`Pair address ${pair}`);
  });

task("create", "Create a pair")
  .addParam("tokenA", "address of token A")
  .addParam("tokenB", "address of token B")
  .setAction(async ({ tokenA, tokenB }, { ethers }) => {
    const adapter = await ethers.getContractAt(
      "UniswapAdapter",
      process.env.ADAPTER_ADDRESS as string
    );

    await adapter.createPair(tokenA, tokenB);

    console.log("Pair was created");
  });

task("add", "Add liquidity")
  .addParam("tokenA", "address of token A")
  .addParam("tokenB", "address of token B")
  .addParam("amountA", "desired amount of token A")
  .addParam("amountB", "desired amount of token B")
  .setAction(async ({ tokenA, tokenB, amountA, amountB }, { ethers }) => {
    const adapter = await ethers.getContractAt(
      "UniswapAdapter",
      process.env.ADAPTER_ADDRESS as string
    );

    await adapter.addLiquidity(tokenA, tokenB, amountA, amountB);

    console.log("Liquidity added");
  });

task("remove", "Remove liquidity")
  .addParam("tokenA", "address of token A")
  .addParam("tokenB", "address of token B")
  .setAction(async ({ tokenA, tokenB }, { ethers }) => {
    const adapter = await ethers.getContractAt(
      "UniswapAdapter",
      process.env.ADAPTER_ADDRESS as string
    );

    await adapter.removeLiquidity(tokenA, tokenB);

    console.log("Liquidity removed");
  });

task("swap", "Swapping tokens")
  .addParam("tokenIn", "Incoming token")
  .addParam("tokenOut", "Received token")
  .addParam("amountIn", "Incoming token amount")
  .setAction(async ({ tokenIn, tokenOut, amountIn }, { ethers }) => {
    const adapter = await ethers.getContractAt(
      "UniswapAdapter",
      process.env.ADAPTER_ADDRESS as string
    );

    await adapter.swap(tokenIn, tokenOut, amountIn);

    console.log("Tokens are swapped");
  });
