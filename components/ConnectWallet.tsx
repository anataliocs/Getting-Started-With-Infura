import { useEffect, useRef } from 'react';
import useTransactionStore from '@/helpers/store_transaction';
import ModelViewer from '@metamask/logo';
import Image from 'next/image';

import Card from '@components/Card';
import ConnectButton from '@components/ConnectButton';
import EthereumIcon from '@components/icons/EthereumIcon';
import Link from '@components/Link';
import LoadingSpinner from '@components/LoadingSpinner';
import PrimaryButton from '@components/PrimaryButton';

import styles from '@styles/modules/ConnectWallet.module.css';

interface ConnectWalletProps {
  isLoading: boolean;
  displayError: boolean;
  handleConnectWallet: () => void;
}

// Need any here as MetaMask library doesn't supply types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let viewer: any;

const ConnectWallet = ({
  isLoading,
  displayError,
  handleConnectWallet,
}: ConnectWalletProps) => {
  const walletAddress = useTransactionStore((state) => state.walletAddress);
  const walletBalance = useTransactionStore((state) => state.walletBalance);

  const logoContainer = useRef(null);

  useEffect(() => {
    if (!logoContainer.current || viewer) return;

    viewer = ModelViewer({
      pxNotRatio: true,
      width: 200,
      height: 160,
      followMouse: false,
      slowDrift: false,
    });

    // add viewer to DOM
    const container = logoContainer.current as HTMLDivElement;
    container.appendChild(viewer.container);
    // const container = document.getElementById('logo-container');
    // container?.appendChild(viewer.container);

    // look at something on the page
    viewer.lookAt({
      x: 100,
      y: 100,
    });

    // enable mouse follow
    viewer.setFollowMouse(true);

    // deallocate nicely
    viewer.stopAnimation();
  }, []);

  return (
    <>
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
                href="/transaction/transfer"
                className={styles.card__next_button}
              >
                Next
              </PrimaryButton>
            </>
          ) : (
            <>
              {/* <MetaMaskLogo /> */}
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
                wallet to start sending transactions
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
    </>
  );
};

export default ConnectWallet;
