//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";

contract UniswapAdapter {
    using SafeERC20 for IERC20;

    /**
     * Emitted when liquidity is added
     * @param amountA - amountA added to the pool
     * @param amountB - amountA added to the pool
     * @param liquidity - amount of liquidity tokens
     */
    event AddLiquidity(uint256 amountA, uint256 amountB, uint256 liquidity);

    /**
     * Emitted when liquidity is removed
     * @param amountA - amountA removed to the pool
     * @param amountB - amountA removed to the pool
     */
    event RemoveLiquidity(uint256 amountA, uint256 amountB);

    /**
     * Emitted when pair is created
     * @param pair - pair address
     */
    event CreatePair(address indexed pair);

    /**
     * Emitted when tokens are swapped
     * @param to - address of the recipient
     * @param amounts - array of token amounts
     */
    event Swap(address indexed to, uint256[] amounts);

    address private constant FACTORY =
        0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    address private constant ROUTER =
        0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private constant WETH = 0xc778417E063141139Fce010982780140Aa0cD5Ab;

    /**
     * Function to get liquidity amount
     * @param pair - pair address
     * @return liquidity - amount of liquidity
     */
    function getLiquidity(address pair)
        public
        view
        returns (uint256 liquidity)
    {
        liquidity = IERC20(pair).balanceOf(address(this));
    }

    /**
     * Function to get the address of a pair
     * @param tokenA - address of token A
     * @param tokenB - address of token B
     * @return pair - pair address
     */
    function getPair(address tokenA, address tokenB)
        public
        view
        returns (address pair)
    {
        pair = IUniswapV2Factory(FACTORY).getPair(tokenA, tokenB);
    }

    /**
     * Function to create a pair
     * @param tokenA - address of token A
     * @param tokenB - address of token B
     */
    function createPair(address tokenA, address tokenB) external {
        address pair = IUniswapV2Factory(FACTORY).createPair(tokenA, tokenB);

        emit CreatePair(pair);
    }

    /**
     * Function to add liquidity
     * @param tokenA - address of token A
     * @param tokenB - address of token B
     * @param amountADesired - desired amount of token A
     * @param amountBDesired - desired amount of token B
     */
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired
    ) external {
        IERC20(tokenA).safeTransferFrom(
            msg.sender,
            address(this),
            amountADesired
        );
        IERC20(tokenB).safeTransferFrom(
            msg.sender,
            address(this),
            amountBDesired
        );

        IERC20(tokenA).approve(ROUTER, amountADesired);
        IERC20(tokenB).approve(ROUTER, amountBDesired);

        (
            uint256 amountA,
            uint256 amountB,
            uint256 liquidity
        ) = IUniswapV2Router02(ROUTER).addLiquidity(
                tokenA,
                tokenB,
                amountADesired,
                amountBDesired,
                1,
                1,
                address(this),
                block.timestamp
            );

        emit AddLiquidity(amountA, amountB, liquidity);
    }

    /**
     * Function to remove liquidity
     * @param tokenA - address of token A
     * @param tokenB - address of token B
     */
    function removeLiquidity(address tokenA, address tokenB) external {
        address pair = IUniswapV2Factory(FACTORY).getPair(tokenA, tokenB);
        uint256 liquidity = getLiquidity(pair);

        IERC20(pair).approve(ROUTER, liquidity);

        (uint256 amountA, uint256 amountB) = IUniswapV2Router02(ROUTER)
            .removeLiquidity(
                tokenA,
                tokenB,
                liquidity,
                1,
                1,
                address(this),
                block.timestamp
            );

        emit RemoveLiquidity(amountA, amountB);
    }

    /**
     * Function for swapping tokens
     * @param tokenIn - incoming token
     * @param tokenOut - received token
     * @param amountIn - incoming token amount
     */
    function swap(
        address tokenIn,
        address tokenOut,
        uint256 amountIn
    ) external {
        require(getPair(tokenIn, tokenOut) != address(0x0), "No pair");

        IERC20(tokenIn).safeTransferFrom(msg.sender, address(this), amountIn);
        IERC20(tokenIn).approve(ROUTER, amountIn);

        address[] memory path;
        path = new address[](2);
        path[0] = tokenIn;
        path[1] = tokenOut;

        uint256[] memory amounts = IUniswapV2Router02(ROUTER)
            .swapExactTokensForTokens(
                amountIn,
                1,
                path,
                msg.sender,
                block.timestamp
            );

        emit Swap(msg.sender, amounts);
    }
}
