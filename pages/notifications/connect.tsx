import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import useNotificationsStore from 'helpers/store_notifications';

import Card from '@components/Card';
import ConnectButton from '@components/ConnectButton';
import EthereumIcon from '@components/icons/EthereumIcon';
import LoadingSpinner from '@components/LoadingSpinner';
import NavModalBreadcrumbs from '@/components/transaction';
import PrimaryButton from '@components/PrimaryButton';

import styles from '@styles/modules/ConnectWallet.module.css';
import Link from '@components/Link';

const Connect: NextPage = () => {
  const walletAddress = useNotificationsStore((state) => state.walletAddress);
  const walletBalance = useNotificationsStore((state) => state.walletBalance);

  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displayError, setDisplayError] = useState(false);

  const handleConnectWallet = async () => {
    const { ethereum } = window;
    setIsLoading(true);

    if (typeof ethereum !== 'undefined') {
      try {
        const [accountAddress] = await ethereum.request({
          method: 'eth_requestAccounts',
        });

        const data = await axios.post('/api/transactions/getBalance', {
          accountAddress,
        });

        useNotificationsStore.setState({ walletAddress: accountAddress });
        useNotificationsStore.setState({ walletBalance: data.data.balance });
        setIsLoading(false);
      } catch {
        useNotificationsStore.setState({ walletAddress: '' });
        useNotificationsStore.setState({ walletBalance: undefined });
        setIsLoading(false);
      }
    } else {
      setDisplayError(true);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Head>
        <title>Infura - Notifications</title>
        <meta name="description" content="Infura Tutorial - Notifications" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavModalBreadcrumbs
        settingsModalIsOpen={settingsModalIsOpen}
        setSettingsModalIsOpen={setSettingsModalIsOpen}
        breadcrumbs={[
          {
            label: 'Connect',
            href: '/notifications/connect',
          },
          {
            label: 'Subscribe',
            href: '/notifications/subscribe',
          },
          {
            label: 'Review',
            href: '/notifications/review',
          },
        ]}
      >
        <Card containerClassName={styles.card}>
          <div className={styles.card__content}>
            {walletBalance != null ? (
              <>
                <h1 className={styles.card__title_connected}>
                  Connected to MetaMask
                </h1>
                <Image
                  src="/images/MetaMask_Fox.png"
                  alt="MetaMask Fox"
                  height={50}
                  width={50}
                />
                <p className={styles.card__balance_label}>Balance:</p>
                <p className={styles.card__balance_value}>
                  <EthereumIcon className={styles.card__balance_ethIcon} />
                  <span>{parseFloat(walletBalance.toFixed(4))}</span>
                </p>
                <PrimaryButton
                  href="/notifications/subscribe"
                  className={styles.card__next_button}
                >
                  Next
                </PrimaryButton>
              </>
            ) : (
              <>
                <Image
                  src="/images/MetaMask_Fox.png"
                  alt="MetaMask Fox"
                  height={80}
                  width={80}
                />
                <h1 className={styles.card__title}>Connect Wallet</h1>
                <p className={styles.card__text}>
                  <span>
                    <Link href="https://support.mycrypto.com/how-to/getting-started/where-to-get-testnet-ether/">
                      Add some testnet ETH
                    </Link>
                  </span>{' '}
                  and connect your <span className={styles.bold}>MetaMask</span>{' '}
                  wallet to start making payments
                </p>
              </>
            )}
          </div>
        </Card>

        {!walletAddress && (
          <ConnectButton
            className={styles.connect_button}
            onClick={handleConnectWallet}
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : 'Connect Wallet'}
          </ConnectButton>
        )}

        {displayError && (
          <p className={styles.errorMessage}>
            We couldn't detect your wallet. Please click{' '}
            <a
              href="https://metamask.io"
              target="blank"
              className={styles.errorMessage__link}
            >
              here
            </a>{' '}
            to download the MetaMask extension and set up a wallet.
          </p>
        )}
      </NavModalBreadcrumbs>
    </div>
  );
};

export default Connect;
