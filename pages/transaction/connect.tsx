import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';
import useTransactionStore from '@/helpers/store_transaction';
import NavModalBreadcrumbs from '@/components/transaction';
import ConnectWallet from '@/components/ConnectWallet';

const Connect: NextPage = () => {
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

        useTransactionStore.setState({ walletAddress: accountAddress });
        useTransactionStore.setState({ walletBalance: data.data.balance });
        setIsLoading(false);
      } catch {
        useTransactionStore.setState({ walletAddress: '' });
        useTransactionStore.setState({ walletBalance: undefined });
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
        <title>Infura - Send Transaction</title>
        <meta name="description" content="Infura Tutorial - Send Transaction" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavModalBreadcrumbs
        settingsModalIsOpen={settingsModalIsOpen}
        setSettingsModalIsOpen={setSettingsModalIsOpen}
      >
        <ConnectWallet
          isLoading={isLoading}
          displayError={displayError}
          handleConnectWallet={handleConnectWallet}
        />
      </NavModalBreadcrumbs>
    </div>
  );
};

export default Connect;
