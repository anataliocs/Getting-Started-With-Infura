# Getting Started with Infura Sample Projects

- Sample Project 1 - Send Transaction
- Sample Project 2 - IPFS
- Sample Project 3 - Notifications
- Sample Project 4 - Minting an NFT

[Getting Started with Infura Article](https://blog.infura.io/post/getting-started-with-infura-28e41844cc89)

## Run Project Locally

### 1. Installation

Clone the project

```bash
  git clone git@github.com:anataliocs/Getting-Started-With-Infura.git
```

Go to the project directory

```bash
  cd Getting-Started-With-Infura
```

Install dependencies

```bash
  yarn
```

### 2. Environment Variables

Create environment variables file

```bash
  cp template.env .env
```

You'll need to [sign up](https://app.infura.io/register?utm_source=github&utm_medium=devcommunity&utm_campaign=2022_Nov_github-devrel-poc-apps_tutorial_content) for an Infura account and create an Ethereum project and an IPFS project.

Add your Infura project IDs and Secrets to the `.env` file.

We'll be using the [Goerli](https://goerli.etherscan.io/) testnet.

Install dotenv:
```
npm i dotenv
```

Setup your .env file:

```

  # Send Transaction Variables
  NEXT_PUBLIC_WEB3_TEST_ETHEREUM_NETWORK=goerli
  NEXT_PUBLIC_WEB3_INFURA_API_KEY=[Your WEB3 Infura Project]

  # IPFS Variables
  NEXT_PUBLIC_INFURA_IPFS_ENDPOINT=https://ipfs.infura.io:5001
  NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID=[Your IPFS Infura Project ID]
  NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET=[Your IPFS Infura Project Secret]

  # Minting Variables
  WALLET_MNEMONIC=
  NEXT_PUBLIC_MINTING_INFURA_PROJECT_ID=[Your WEB3 Infura Project]
  NEXT_PUBLIC_SMART_CONTRACT_ADDRESS=[The hash of the deployed contract on goerli]
```

### 3. Run the Project

```bash
  yarn dev
```

# Sample Project 1 - Send Transaction

In this project the user will connect their MetaMask wallet, send a transaction, and then review a transaction, all using the [Infura](https://infura.io) API.

### 1 - Fund Your Wallet With Testnet Ether

In your MetaMask wallet, switch to the `Goerli Test Network` (you may have to click "show/hide test networks" and toggle the setting to see the Goerli network)

Go to https://faucet.paradigm.xyz/, connect your wallet, and then request the test ETH be sent to your account.

### 2 - Connect Wallet

Go to http://localhost:3000/transaction/connect and click `Connect Wallet`

In `/api/balance.ts` we are using the Infura API [eth_getBalance](https://docs.infura.io/infura/networks/ethereum/json-rpc-methods/eth_getbalance) to get the current balance of ETH in the connected wallet account.

### 3 - Transfer ETH

Enter a wallet address for the wallet that you are going to be tranferring **to** (you can create an additional account in your MetaMask wallet to send to)

Enter the amount of testnet Ether you want to transfer (i.e. 0.001 ETH)

Hit `Submit` and if your wallet has sufficient funds the transaction will be mined (Note that the transaction may take a while to finish up, testnets can often be a bit slow)

When the transaction is mined you'll see a confirmation screen with the `transaction hash`, copy the hash to the clipboard for the next step

### 4 - Review

Paste your transaction hash from the previous step and click `Review`

You should then see the transaction details.

# Sample Project 2 - Upload to IPFS

In this project the user will upload a png/jpeg image and metadata json to IPFS, then use the tokenURI to retrieve and display the image and its metadata.

### 1 - Set up environment variables

Add the values from your Infura dashboard for these three environment variables.

```bash

  # IPFS Variables
  NEXT_PUBLIC_INFURA_IPFS_ENDPOINT=
  NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID=
  NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET=
```

### 2 - Run the project

Note: You'll have to restart the project server after saving new environment variables.

```bash
  yarn dev
```

### 3 - Upload an image

Use the form on [/ipfs/upload](http://localhost:3000/ipfs/upload) to upload an image and metadata to IPFS. `.png` and `.jpeg` images are currently the only supported formats.

On the back end of this upload, we are first uploading the image to IPFS, then creating a json object using the metadata and adding IPFS hash of the image to that object. This is a common format for NFTs, and the json object looks like this once it's uploaded:

```json
  {
    "name": "NFT Name",
    "description": "Description of NFT",
    "image": "<ipfs hash for image>",
    "attributes": [
      { "trait_type": "Color", "value": "Blue" },
      { "trait_type": "fileSize", "value": "71.4 KB" },
      { "trait_type": "fileType", "value": "image/png" },
      { "trait_type": "objectHash", "value": "<ipfs hash for this metadata object>" }
    ]
  }
```

On the success screen, copy the IPFS hash.

### 4 - Display your image

Use the form on [/ipfs/display](http://localhost:3000/ipfs/display) to enter the IPFS hash you copied in the previous step and click `submit`.

This will retrieve your image and it's metadata from IPFS and display it.

# Sample Project 3 - Transaction Notifications

In this project, you will subscribe to a ETH address and recieve notifications for pending transactions.

### 1 - Project setup

- Follow the primary application setup and fill in these env variables. Network should be `goerli`

  ```bash
  NEXT_PUBLIC_WEB3_TEST_ETHEREUM_NETWORK=goerli
  NEXT_PUBLIC_WEB3_INFURA_API_KEY=[Your WEB3 Infura Project]
  ```

- Install and setup a Metamask account, switch network to `goerli`
- Install project dependencies

  ```bash
  yarn
  ```

- Start the app

  ```bash
  yarn dev
  ```

- Navigate to Notifications demo page

  ```bash
  http://localhost:3000/notifications
  ```

### 2 - Connect your Metamask Wallet

- Click get started on the Notifications landing to be taken to the connect screen.
- Once your wallet is connected proceed to step 3

### 3 - Subscribe to an Account

- Enter an ETH address you would like to get notifications for
- You will be taken to a waiting for notifications screen which will populate once a transaction is found

### 4 - Send a transaction

- Using either Metamask or the Send Transaction Demo (in a new tab), send a transaction to the account address you entered in step 3.

### 5 - Recieve a notification

- On the notifications review step, once a transaction is detected you will see the latest notification populated on the page, as well as all recent notifications under the notifications bell at the top.

# Sample Project 4 - Mint an NFT

In this project the user will deploy a smart contract using Truffle, upload to IPFS, and mint an NFT.

### 1 - Fund your wallet

In your MetaMask wallet, switch to the `Goerli Test Network` (you may have to click "show/hide test networks" and toggle the setting to see the Goerli network)

Go to https://faucet.paradigm.xyz/, connect your wallet, and then request the test ETH

### 2 - Deploy a Smart Contract

1. Install Truffle: `yarn global add truffle`

   [Truffle](https://trufflesuite.com/) is a development environment, testing framework, and asset pipeline for blockchains using the Ethereum Virtual Machine. The suite of Truffle tools is quite powerful, we're going to be using Truffle's built-in smart contract compilation, linking, deployment, and binary management.

   The truffle project has already been initialized so you'll see `contracts/`, `migrations/`, and `truffle-config.js` already in the project structure.

2. Add your wallet mnemonic (the twelve-word phrase the wallet uses to generate public/private key pairs) and your Infura project ID for an Ethereum project (this can be the same project ID as the Send Transaction Project) to your environment variables. We'll use the goerli network for this example so you can preview your minted nft on OpenSea Testnets.

   ```bash

   # Minting Variables
    WALLET_MNEMONIC=
    NEXT_PUBLIC_MINTING_INFURA_PROJECT_ID=[Your WEB3 Infura Project]
   ```

   **IMPORTANT:** Be careful not to share or commit your wallet mnemonic, it can be used to access your wallet accounts and their contents.

3. In `/contracts/NFTContract.sol` you'll find a basic smart contract for minting NFTs. This contract uses [OpenZeppelin](https://docs.openzeppelin.com/) - a trusted open-source library of Solidity smart contracts - to construct an ERC721 Token Contract. ERC721 is a token standard for representing ownership of non-fungible tokens (i.e. where each token is unique).

   In `NFTContract.sol` give your NFT collection a name and symbol. Each NFT minted with this contract will have an ID number. The `tokenCounter` will act as the ID and the contract will increment the counter as new NFTs are minted.

4. In your terminal run

   ```bash
   truffle compile
   ```

   This will add a `build/` folder to the project structure (do not delete)

5. Migrate the smart contract onto the chain by running

   ```bash
   truffle migrate --network goerli
   ```

   **IMPORTANT:** After your migration completes, copy the `contract address` in the cli output and add it to your environment variables

   ```bash

   # Minting Variables
   WALLET_MNEMONIC=
   NEXT_PUBLIC_MINTING_INFURA_PROJECT_ID=
   NEXT_PUBLIC_SMART_CONTRACT_ADDRESS=
   ```

### 3 - Start the app

In your terminal, run

```bash
yarn dev
```

and go to http://localhost:3000/mint

### 4 - Upload to IPFS

Select the file for your NFT and give it a name, description, and attributes (optional), then click `UPLOAD` to upload the NFT metadata to IPFS.

Visit the IPFS documentation above for more details.

**IMPORTANT**: Make sure to copy the tokenURI (IPFS hash) for the uploaded object.

### 5 - Mint

on the `http://localhost:3000/mint/mint` page, paste the token URI you copied in the previous step into the input field. Press submit and wait as your NFT is minted. The results will be displayed when the process is complete.

You can view your collection on OpenSea by searching for the contract address on [OpenSea's Testnet site](https://testnets.opensea.io/)
