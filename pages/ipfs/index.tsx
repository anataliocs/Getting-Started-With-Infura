import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Card from '@components/Card';
import HomePage from '@components/HomePage';
import { IpfsNavbar, IpfsSettingsModal } from '@components/ipfs';
import Link from '@components/Link';
import ChevronRight from '@components/icons/ChevronRight';
import styles from '@styles/modules/Intro.module.css';

const Home: NextPage = () => {
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);

  return (
    <div>
      <Head>
        <title>IPFS Upload</title>
        <meta name="description" content="Infura Tutorial - IPFS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage>
        <IpfsNavbar setSettingsModalIsOpen={setSettingsModalIsOpen} />
        <main className={styles.main}>
          <Card containerClassName={styles.card}>
            <div className={styles.card__content}>
              <h1>IPFS Upload</h1>
              <h2>What You'll Learn</h2>
              <p>
                In this project, you'll take a learn-by-doing approach and
                accomplish the following utilizing the Infura IPFS API:
              </p>
              <ul>
                <li>Upload an image and metadata to IPFS</li>
                <li>View an image and metadata from an IPFS hash</li>
              </ul>
              <h2>What You'll Do</h2>
              <ol>
                <li>
                  Sign up <Link href="https://infura.io/register">here</Link>{' '}
                  for a free Infura account and create an IPFS project. You'll
                  need your project id for the Infura API requests.
                </li>
                <li>
                  On the Upload page, you'll drag or select an image to upload
                  to IPFS, fill out the metadata for the image (name,
                  description, and attributes), and then upload it to IPFS using
                  Infura's IPFS{' '}
                  <Link
                    target="_blank"
                    href="https://docs.infura.io/infura/networks/ipfs/http-api-methods/add"
                  >
                    add
                  </Link>{' '}
                  endpoint.
                </li>
                <li>
                  On the Display page, you'll paste the IPFS hash from the
                  previous step and view the image and metadata using Infura's
                  IPFS{' '}
                  <Link
                    target="_blank"
                    href="https://docs.infura.io/infura/networks/ipfs/http-api-methods/get"
                  >
                    get
                  </Link>{' '}
                  endpoint.
                </li>
              </ol>
              <Link href="/ipfs/upload" className={styles.card__link}>
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
