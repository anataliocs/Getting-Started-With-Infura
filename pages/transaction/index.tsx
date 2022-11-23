import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import Card from '@components/Card';
import HomePage from '@components/HomePage';
import {
  TransactionNavbar,
  TransactionSettingsModal,
} from '@/components/transaction';
import Link from '@components/Link';
import ChevronRight from '@components/icons/ChevronRight';

import styles from '@styles/modules/Intro.module.css';

const Home: NextPage = () => {
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);

  return (
    <div>
      <Head>
        <title>Infura - Send Transaction</title>
        <meta name="description" content="Infura Tutorial - Send Transaction" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage>
        <TransactionNavbar setSettingsModalIsOpen={setSettingsModalIsOpen} />
        <main className={styles.main}>
          <Card containerClassName={styles.card}>
            <div className={styles.card__content}>
              <h1>Send Transaction</h1>
              <h2>What You'll Learn</h2>
              <p>
                In this project, you'll take a learn-by-doing approach and
                accomplish the following utilizing the Infura API:
              </p>

              <ul>
                <li>How to connect to a user's wallet</li>
                <li>Display the current balance in their wallet</li>
                <li>Send a transaction from one wallet address to another</li>
                <li>
                  View the details of the transaction you just made on the
                  blockchain
                </li>
              </ul>
              <h2>What You'll Do</h2>
              <ol>
                <li>
                  Sign up <Link href="https://infura.io/register?utm_source=github&utm_medium=devcommunity&utm_campaign=2022_Jul_devrel-sample-projects_content_content">here</Link>{' '}
                  for a free Infura account and create an Ethereum project and
                  IPFS project. You'll need your project id's for the Infura API
                  requests.
                </li>
                <li>
                  Create a MetaMask wallet{' '}
                  <Link href="https://metamask.io/">here</Link> if you don't
                  have one.
                </li>
                <li>
                  Fund your wallet with some testnet ETH. In your MetaMask
                  wallet, switch to the <code>Goerli Test Network</code> (you
                  may have to click 'show/hide test networks' and toggle the
                  setting to see the Goerli network). Go to this{' '}
                  <Link href="https://support.mycrypto.com/how-to/getting-started/where-to-get-testnet-ether/">
                    testnet faucet
                  </Link>
                  , connect your wallet, and then request the test ETH be sent
                  to your account.
                </li>
                <li>
                  The first page of the Send Transaction project is the Connect
                  page. Here you'll click <code>Connect Wallet</code> and will
                  be prompted by your MetaMask extension to connect. You'll then
                  use Infura's{' '}
                  <Link href="https://docs.infura.io/infura/networks/ethereum/json-rpc-methods/eth_getbalance">
                    eth_getBalance
                  </Link>{' '}
                  endpoint to display the balance of your wallet.
                </li>
                <li>
                  You'll then proceed to the 'Pay' step, where you'll transfer
                  some testnet ETH from one wallet account to another using
                  Infura's{' '}
                  <Link href="https://docs.infura.io/infura/networks/ethereum/json-rpc-methods/eth_sendtransaction">
                    eth_sendTransaction
                  </Link>{' '}
                  endpoint. Once the transaction is written to the blockchain,
                  you'll copy the transaction hash or ID to use in the next
                  step.
                </li>
                <li>
                  Finally, you'll use the transaction hash from the transaction
                  you just made to view the transaction details using Infura's{' '}
                  <Link href="https://docs.infura.io/infura/networks/ethereum/json-rpc-methods/eth_gettransactionbyhash">
                    eth_getTransaction
                  </Link>{' '}
                  endpoint. You'll get useful data such as the sender and
                  receiver addresses, the value of the transaction, the gas
                  used, etc.
                </li>
              </ol>
              <Link href="/transaction/connect" className={styles.card__link}>
                <span>GET STARTED</span>
                <ChevronRight />
              </Link>
            </div>
          </Card>
          <TransactionSettingsModal
            settingsModalIsOpen={settingsModalIsOpen}
            setSettingsModalIsOpen={setSettingsModalIsOpen}
          />
        </main>
      </HomePage>
    </div>
  );
};

export default Home;
