import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '@styles/modules/ipfs/ipfs.module.css';
import NavModalBreadcrumbs from '@components/ipfs';
import IPFSUploadForm from '@/components/IPFSUploadForm';

const Upload: NextPage = () => {
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  return (
    <div>
      <Head>
        <title>Upload with IPFS - Upload</title>
        <meta name="description" content="Sample Project - Upload with IPFS - Upload Step" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavModalBreadcrumbs
        settingsModalIsOpen={settingsModalIsOpen}
        setSettingsModalIsOpen={setSettingsModalIsOpen}
      >
        <IPFSUploadForm
          nextPageHref="/ipfs/display"
          setError={setError}
        />
        {error && <p className={styles['ipfs__error-message']}>{error}</p>}
     </NavModalBreadcrumbs>
    </div>
  );
};

export default Upload;
