import { NextPage } from 'next';
import Head from 'next/head';

import styles from '../../styles/modules/notifications/Intro.module.css';

import Card from '@components/Card';
import HomePage from '@components/HomePage';
import Link from '@components/Link';
import ChevronRight from '@components/icons/ChevronRight';
import NotificationsNavBar from '@components/notifications/NotificationsNavbar';
import { TransactionSettingsModal } from '@/components/transaction';
import { useState } from 'react';

const Notifications: NextPage = () => {
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);

  return (
    <div>
      <Head>
        <title>Infura - Notifications</title>
        <meta name="description" content="Infura Tutorial - Notifications" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage>
        <NotificationsNavBar
          onSettingsClick={() => setSettingsModalIsOpen(!settingsModalIsOpen)}
        />
        <TransactionSettingsModal
          settingsModalIsOpen={settingsModalIsOpen}
          setSettingsModalIsOpen={setSettingsModalIsOpen}
        />
        <main className={styles.main}>
          <Card containerClassName={styles.card}>
            <div className={styles.card__content}>
              <h1>Notifications</h1>
              <p>
                We suggest going through the{' '}
                <Link href="/transaction" target="_blank">
                  Send Transaction tutorial
                </Link>{' '}
                first to get set up with your Metamask and Infura account.
              </p>
              <h2>What you'll learn</h2>
              <p>
                In this project, you'll take a learn-by-doing approach and
                accomplish the following utilizing the Infura API:
              </p>
              <ul>
                <li>How to connect to a user's wallet</li>
                <li>Subscribe to an account</li>
                <li>Send a transaction</li>
                <li>Receive Notifications</li>
              </ul>
              <h2>What You'll Do</h2>
              <ol>
                <li>
                  Sign up <Link href="https://infura.io/register">here</Link>{' '}
                  for a free Infura account and create an Ethereum project.
                  You'll need your project id for the Infura API requests.
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
                  Next, you will need to subscribe to an account.{' '}
                  <Link href="https://metamask.zendesk.com/hc/en-us/articles/360015289452-How-to-create-an-additional-account-in-your-wallet">
                    Create an alternative MetaMask account
                  </Link>{' '}
                  and enter that address. This will be the account used for
                  notifications.
                </li>
                <li>
                  Now that you are subscribed to an account, you can send a
                  transaction using either MetaMask or the{' '}
                  <Link href="/transaction" target="_blank">
                    Send Transaction tutorial
                  </Link>{' '}
                  .
                </li>
                <li>
                  Finally, you will receive notifications and see the details of
                  the latest transaction you sent.
                </li>
              </ol>
              <Link href="/notifications/connect" className={styles.card__link}>
                <span>GET STARTED</span>
                <ChevronRight />
              </Link>
            </div>
          </Card>
        </main>
      </HomePage>
    </div>
  );
};

export default Notifications;
