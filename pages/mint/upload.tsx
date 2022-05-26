import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '@styles/modules/mint/mint.module.css';
import NavModalBreadcrumbs from '@components/mint';
import IPFSUploadForm from '@/components/IPFSUploadForm';

const Upload: NextPage = () => {
  const [settingsModalIsOpen, setSettingsModalIsOpen] =
    useState<boolean>(false);
  const [error, setError] = useState<string>('');

  return (
    <div>
      <Head>
        <title>Mint an NFT</title>
        <meta name="description" content="Infura Tutorial - Mint an NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavModalBreadcrumbs
        settingsModalIsOpen={settingsModalIsOpen}
        setSettingsModalIsOpen={setSettingsModalIsOpen}
      >
        <IPFSUploadForm nextPageHref="/mint/mint" setError={setError} />
        {error && <p className={styles['mint__error-message']}>{error}</p>}
      </NavModalBreadcrumbs>
    </div>
  );
};

export default Upload;
