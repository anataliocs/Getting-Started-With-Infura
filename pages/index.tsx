import type { NextPage } from 'next';
import Head from 'next/head';
import Card from '@components/Card';
import HomePage from '@components/HomePage';
import ChevronRight from '@components/icons/ChevronRight';
import Link from '@components/Link';
import styles from '@styles/modules/Intro.module.css';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Infura Sample Projects</title>
        <meta
          name="description"
          content="Get started learning how to build web3 applications with Infura"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage>
        <main className={styles.main__no_nav}>
          <Card containerClassName={styles.card}>
            <div className={styles.card__content}>
              <h1>Get Started With Infura</h1>
              <p>
                Learn how to use the Infura products to help build your next
                web3 application. We will guide you through how to set up an
                Infura project, <a href="https://metamask.io/">connect to MetaMask</a>, upload to IPFS, and mint an
                NFT.
              </p>
              <h2>Send Transaction</h2>
              <p>
                Learn how to connect to your MetaMask Wallet, transfer ETH, and
                review transactions using the Infura API.
              </p>
              <Link href="/transaction" className={styles.card__link}>
                <span>GET STARTED</span>
                <ChevronRight />
              </Link>

              <h2>IPFS</h2>
              <p>
                Learn how to upload files with metadata to IPFS (Inter-Planetary
                File System) and view them using the Infura API.
              </p>
              <Link href="/ipfs" className={styles.card__link}>
                <span>GET STARTED</span>
                <ChevronRight />
              </Link>

              <h2>Notifications</h2>
              <p>
                Build on top of the Send Transaction project to learn how to
                subscribe to an ETH address and receive notifications using the
                Infura API.
              </p>
              <Link href="/notifications" className={styles.card__link}>
                <span>GET STARTED</span>
                <ChevronRight />
              </Link>

              <h2>Mint an NFT</h2>
              <p>
                Learn how to mint an NFT using ConsenSys products. You will
                deploy a smart contract using Truffle, upload images and
                metadata to IPFS, and then mint your NFT all using the Infura
                APIs.
              </p>
              <Link href="/mint" className={styles.card__link}>
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

export default Home;
