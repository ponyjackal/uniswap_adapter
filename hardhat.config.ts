import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "./task/task";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_PRIVATE_KEY}`,
        blockNumber: 10501673,
      },
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PRIVATE_KEY}`,
      accounts:
        process.env.METAMASK_OWNER_PRIVATE_KEY !== undefined
          ? [
              process.env.METAMASK_OWNER_PRIVATE_KEY as string,
              process.env.METAMASK_PRIVATE_KEY as string,
            ]
          : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
