import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Card from '@components/Card';
import HomePage from '@components/HomePage';
import { IpfsNavbar, IpfsSettingsModal } from '@components/mint';
import Link from '@components/Link';
import ChevronRight from '@components/icons/ChevronRight';
import styles from '@styles/modules/Intro.module.css';

const Home: NextPage = () => {
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);

  return (
    <div>
      <Head>
        <title>Mint an NFT</title>
        <meta name="description" content="Infura Tutorial - Mint an NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage>
        <IpfsNavbar setSettingsModalIsOpen={setSettingsModalIsOpen} />
        <main className={styles.main}>
          <Card containerClassName={styles.card}>
            <div className={styles.card__content}>
              <h1>Mint an NFT</h1>
              <h2>What You'll Learn</h2>
              <p>
                In this project, you'll take a learn-by-doing approach and
                accomplish the following utilizing the Infura API and ConsenSys
                products:
              </p>
              <ul>
                <li>Deploy a smart contract using Truffle</li>
                <li>Upload images and metadata to IPFS</li>
                <li>Tie it all together and mint an NFT</li>
              </ul>
              <h2>What You'll Do</h2>
              <ol>
                <li>
                  Sign up <Link href="https://app.infura.io/register?utm_source=github&utm_medium=devcommunity&utm_campaign=2022_Nov_github-devrel-poc-apps_tutorial_content">here</Link>{' '}
                  for a free Infura account and create an Ethereum project.
                  You'll need your project id for the Infura API requests.
                </li>
                <li>
                  Create a MetaMask wallet{' '}
                  <Link href="https://metamask.io/">here</Link> if you don't
                  have one.
                </li>
                <li>
                  For this project, you'll need a MetaMask wallet on the{' '}
                  <code>Goerli Test Network</code> funded with some{' '}
                  <Link
                    target="_blank"
                    href="https://goerli-faucet.mudit.blog/?__cf_chl_tk=XldAqBU.zw8AEgAx1fl94upLkcvF8SKjiI.QKkBklHc-1669245985-0-gaNycGzNCmU"
                  >
                    testnet ETH
                  </Link>
                  , and an Infura account with an Ethereum project and an IPFS
                  project. If you've been following this series of tutorials,
                  you can reuse the Infura projects from the{' '}
                  <Link target="_blank" href="/transaction">
                    Send Transaction
                  </Link>{' '}
                  and{' '}
                  <Link target="_blank" href="/ipfs">
                    IPFS projects
                  </Link>
                </li>
                <li>
                  Deploy a smart contract using{' '}
                  <Link target="_blank" href="https://trufflesuite.com/">
                    Truffle
                  </Link>{' '}
                  - a development environment, testing framework, and asset
                  pipeline for blockchains using the Ethereum Virtual Machine.
                  The suite of Truffle tools is quite powerful, and we're going
                  to be using Truffle's built-in smart contract compilation,
                  linking, deployment, and binary management. <br />
                  Deploying the smart contract is done in the CLI, follow the
                  steps in the README before getting started.
                </li>

                <li>
                  Once you have your smart contract deployed to the blockchain,
                  you'll go to the Upload page, where you'll select the file for
                  your NFT and give it a name, description, and attributes, then
                  upload it to IPFS.
                </li>
                <li>
                  Paste the IPFS hash from the previous step to mint your NFT.
                </li>
                <li>
                  After the transaction is confirmed and the block is mined,
                  you've successfully minted an NFT! 🎉
                </li>
              </ol>
              <Link href="/mint/upload" className={styles.card__link}>
                <span>GET STARTED</span>
                <ChevronRight />
              </Link>
            </div>
          </Card>
          <IpfsSettingsModal
            settingsModalIsOpen={settingsModalIsOpen}
            setSettingsModalIsOpen={setSettingsModalIsOpen}
          />
        </main>
      </HomePage>
    </div>
  );
};

export default Home;
