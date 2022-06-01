# Uniswap Adapter contract project

# Link

- **[Link to the uniswap adapter](https://rinkeby.etherscan.io/address/0x0db677e78042C9085fA72D003B599ae823B4eFd8)** Rinkeby testnet)
- **[Link to the tokenERC20 TST](https://rinkeby.etherscan.io/address/0xBeBd29D3D052540F997fE1FC930EdD870C7F5E84)** (Rinkeby testnet)
- **[Link to the tokenERC20 ACDM](https://rinkeby.etherscan.io/address/0x6d5Aa83c4dD8b0A4B46fE6c81A97BC0A55DB0EF6)** (Rinkeby testnet)
- **[Link to the tokenERC20 POP](https://rinkeby.etherscan.io/address/0x809f13c8ED42E127BA7AE53EC40d640660CD7EED)** (Rinkeby testnet)

# Basic commands

## Use it to compile the contract

```TypeScript
npx hardhat clean && npx hardhat compile
// or
npm run compile
```

## Use it to deploy the contract locally

```TypeScript
npx hardhat run scripts/deploy.ts --network localhost
// or
npm run local
```

## Use it to deploy the tokenERC20 locally

```TypeScript
npx hardhat run scripts/deployToken.ts --network localhost
// or
npm run token-local
```

## Use it to deploy the contract in the rinkeby test network

```TypeScript
npx hardhat run scripts/deploy.ts --network rinkeby
// or
npm run rinkeby
```

## Use it to deploy the tokenERC20 in the rinkeby test network

```TypeScript
npx hardhat run scripts/deployToken.ts --network rinkeby
// or
npm run token-rinkeby
```

## Use it to test

```TypeScript
npx hardhat test
// or
npm run test
```

## Use it to view the test coverage

```TypeScript
npx hardhat coverage
// or
npm run coverage
```

## Use it to view global options and available tasks

```TypeScript
npx hardhat help
// or
npm run help
```

# Basic task

## get

**Use to get liquidity amount**

```TypeScript
npx hardhat get --pair [PAIR_ADDRESS] --network [NETWORK]
```

## pair

**Use to get the address of a pair**

```TypeScript
npx hardhat pair --token-a [ADDRES_TOKENA] --token-b [ADDRES_TOKENB] --network [NETWORK]
```

## create

**Use to create a pairote**

```TypeScript
npx hardhat create --token-a [ADDRES_TOKENA] --token-b [ADDRES_TOKENB] --network [NETWORK]
```

## add

**Use to add liquidity**

```TypeScript
npx hardhat add --token-a [ADDRES_TOKENA] --token-b [ADDRES_TOKENB] --amount-a [DESIRED_AMOUNTA] --amount-a [DESIRED_AMOUNTB] --network [NETWORK]
```

## remove

**Use to remove liquidity**

```TypeScript
npx hardhat remove --token-a [ADDRES_TOKENA] --token-b [ADDRES_TOKENB] --network [NETWORK]
```

## swap

**Use to swapping tokens**

```TypeScript
npx hardhat swap --token-in [INCOMING_TOKEN] --token-out [RECEIVED_TOKEN] --amount-in [INCOMING_AMOUNT] --network [NETWORK]
```
