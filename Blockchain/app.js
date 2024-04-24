const { ethers } = require("ethers");
const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';//from hardhat priavte key
const infuraApiKey = '80e53e78eed04090ad353a72ccc73b72';
const network = 'mainnet';
const uniswapRouterAddress = '0x198EF79F1F515F02dFE9e3115eD9fC07183f02fC';   
const tokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; //DAI Stablecoin

// Connect to the Ethereum network
const provider = new ethers.InfuraProvider(network, infuraApiKey);

// Create a wallet using your private key
const wallet = new ethers.Wallet(privateKey, provider);

// Set up the Uniswap contract interfaces
const uniswapRouterAbi = [
    'function swapExactETHForTokens(uint amountOutMin, address[] path, address to, uint deadline) external payable returns (uint[] memory amounts)'
  ];
const uniswapRouter = new ethers.Contract(uniswapRouterAddress, uniswapRouterAbi, wallet);

// Amount to send (in ethers)
const ethAmount = ethers.parseEther("10"); // Replace with the amount of ETH you want to swap

// Destination address (token address)
const toAddress = tokenAddress;

// Swap ETH for tokens
async function swapETHForTokens() {
    // Set the deadline for the swap (20 minutes from now)
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now
    // Minimum amount of tokens you want to receive 
    const amountOutMin = 10; 
    // Define the swap path from WETH to the specified token
    const path = ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', toAddress]; // WETH to Token
     // Execute the swap
    const tx = await uniswapRouter.swapExactETHForTokens(
      amountOutMin,     // Minimum amount of tokens you want to receive  
      path,           // Array defining the swap path from WETH to the specified token                  
      wallet.address, // Address that will receive the swapped tokens
      deadline,      // Deadline for the swap (timestamp in seconds)
      { value: ethAmount, gasPrice: ethers.parseUnits('37', 'gwei') } // Gas price for the transaction in Gwei
    );
  // Log the transaction hash to the console
    console.log('Transaction Hash:', tx.hash);
  }
  // Call the swap function
  swapETHForTokens();



  //after running insufficient funds error i tried changing the private key but still same error occur