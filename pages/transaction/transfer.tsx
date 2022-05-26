import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import axios, { AxiosError } from 'axios';
import useTransactionStore from '@/helpers/store_transaction';

import Card from '@components/Card';
import Check from '@components/icons/Check';
import HelpText from '@components/HelpText';
import NavModalBreadcrumbs from '@/components/transaction';
import PrimaryButton from '@components/PrimaryButton';
import ReadOnly from '@components/ReadOnly';
import TextInput from '@components/TextInput';
import { web3 as Web3 } from '@utils/transaction';

import styles from '@styles/modules/transaction/Pay.module.css';

const Pay: NextPage = () => {
  const transaction = useTransactionStore((state) => state.transaction);

  const account = useTransactionStore((state) => state.walletAddress);

  const [transferToAddress, setTransferToAddress] = useState<string>('');
  const [transferAmount, setTransferAmount] = useState<string>('');

  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTransactionSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!transferToAddress || !transferAmount) {
      setError('Please fill out all fields');
      return;
    }

    setIsLoading(true);
    try {
      const ethereum = window.ethereum;
      const amt = Number(Number(transferAmount) * 1e18).toString(16);

      const txHash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: account,
            to: transferToAddress,
            value: amt,
          },
        ],
      });

      const transaction = await Web3.eth.getTransaction(txHash);

      if (transaction) {
        useTransactionStore.setState({
          transaction: transaction,
        });

        setError('');
        setIsLoading(false);
      }
    } catch (err: unknown | AxiosError) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError;
        const response = axiosErr.response;
        setError(response?.data.message);
      } else {
        const e = err as Error;
        setError(e.message);
      }
      useTransactionStore.setState({ transaction: undefined });
      setIsLoading(false);
    }
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
        <Card containerClassName={styles.card}>
          <div className={styles.card__content}>
            {transaction ? (
              <>
                <h1 className={styles.card__title}>
                  Transaction Sent
                  <span className={styles.checkMark}>
                    <Check />
                  </span>
                </h1>
                <div className={styles.readOnly__group}>
                  <div>
                    <ReadOnly
                      label="Transaction Hash"
                      value={transaction.hash}
                      copyable
                    />
                    <HelpText className={styles.helpText}>
                      Copy the transaction hash to review the transaction in the
                      next step
                    </HelpText>
                  </div>
                  <ReadOnly label="Sent From" value={transaction.from} />
                  <ReadOnly label="Sent To" value={transaction.to} />
                </div>
                <PrimaryButton
                  href="/transaction/review"
                  className={styles.card__button}
                >
                  Next
                </PrimaryButton>
              </>
            ) : (
              <>
                <h1 className={styles.card__title}>Transfer ETH</h1>
                <form
                  className={styles.card__form}
                  onSubmit={handleTransactionSubmit}
                >
                  <TextInput
                    label="Address"
                    id="toAddress"
                    value={transferToAddress}
                    onChange={(event) => {
                      const target = event.target as HTMLInputElement;
                      setTransferToAddress(target.value);
                    }}
                    helperText="The address you want to send ETH to"
                    containerClassName={styles.card__input}
                    labelClassName={styles.card__input1_label}
                  />
                  <TextInput
                    label="Amount"
                    id="amount"
                    type="number"
                    value={transferAmount}
                    onChange={(event) => {
                      const target = event.target as HTMLInputElement;
                      setTransferAmount(target.value);
                    }}
                    helperText="Enter the amount in ETH"
                    containerClassName={styles.card__input}
                    labelClassName={styles.card__input2_label}
                    step="any"
                  />
                  <PrimaryButton
                    className={styles.card__button}
                    type="submit"
                    disabled={
                      isLoading || !transferToAddress || !transferAmount
                    }
                    isLoading={isLoading}
                  >
                    Submit
                  </PrimaryButton>
                </form>
              </>
            )}
          </div>
        </Card>

        {error && <p className={styles.errorMessage}>{error}</p>}
      </NavModalBreadcrumbs>
    </div>
  );
};

export default Pay;
