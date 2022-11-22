import Web3 from 'web3';

// Configure the connection to an Ethereum node
export const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://${process.env.NEXT_PUBLIC_WEB3_TEST_ETHEREUM_NETWORK}.infura.io/v3/${process.env.NEXT_PUBLIC_MINTING_INFURA_PROJECT_ID}`
  )
);
