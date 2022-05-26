import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import axios, { AxiosError } from 'axios';
import useTransactionStore from '@/helpers/store_transaction';
import Card from '@components/Card';
import NavModalBreadcrumbs from '@/components/transaction';
import PrimaryButton from '@components/PrimaryButton';
import ReadOnly from '@components/ReadOnly';
import TextInput from '@components/TextInput';
import styles from '@styles/modules/transaction/Review.module.css';
import IconButton from '@components/IconButton';
import CloseIcon from '@components/icons/CloseIcon';
import Link from '@components/Link';
import ChevronRight from '@components/icons/ChevronRight';
import { weiToEther } from '@/utils/transaction';

const Review: NextPage = () => {
  const transaction = useTransactionStore((state) => state.transaction);

  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [transactionHash, setTransactionHash] = useState<string>(
    transaction ? transaction?.hash : ''
  );

  const handleTransactionReview = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);

    if (!transactionHash) {
      return handleTransactionReviewError(
        new Error('Please enter a transaction hash')
      );
    }

    try {
      const { data } = await axios.post('/api/transactions/getTransaction', {
        transactionHash,
      });

      useTransactionStore.setState({
        transaction: data.transaction,
      });

      setError('');
      setIsLoading(false);
    } catch (err: unknown | AxiosError) {
      handleTransactionReviewError(err);
    }
  };

  const handleTransactionReviewError = (err: unknown | AxiosError) => {
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
            <h1 className={styles.card__title}>Review Transaction</h1>
            <form
              onSubmit={handleTransactionReview}
              className={styles.card__form}
            >
              <TextInput
                label="Transaction Hash"
                id="transactionHash"
                value={transactionHash}
                onChange={(event) => {
                  const target = event.target as HTMLInputElement;
                  setTransactionHash(target.value);
                }}
                placeholder="Enter a transaction hash"
                helperText="Review the transaction details"
                className={styles.card__input}
                containerClassName={styles.card__input__container}
                labelClassName={styles.card__input__label}
              />
              {transactionHash && transactionHash !== transaction?.hash && (
                <PrimaryButton
                  className={styles.card__button}
                  type="submit"
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  Submit
                </PrimaryButton>
              )}
              {transactionHash && (
                <IconButton
                  className={styles.card__input__clearBtn}
                  onClick={() => setTransactionHash('')}
                >
                  <CloseIcon width='14' height='14' />
                </IconButton>
              )}
            </form>
            {transaction && (
              <>
                <h2 className={styles.card__subtitle}>Transaction Summary</h2>
                <div className={styles.card__summary}>
                  <ReadOnly
                    label="Transaction Hash"
                    value={transaction.hash}
                    copyable
                  />
                  <ReadOnly label="Sent From" value={transaction.from} />
                  <ReadOnly label="Sent To" value={transaction.to} />
                  <ReadOnly
                    label="Value"
                    // transaction value is in wei, so convert to ether
                    value={`${weiToEther(transaction.value)} ETH`}
                  />
                </div>
                <p className={styles.card__text}>
                  Congrats on finishing the tutorial, you can view more
                  information on your transaction on Etherscan
                </p>
                <Link
                  href={`https://${process.env.NEXT_PUBLIC_ETHEREUM_NETWORK}.etherscan.io/tx/${transaction.hash}`}
                  target="_blank"
                  className={styles.card__etherscan__link}
                >
                  <span>View on Etherscan</span>
                  <ChevronRight className={styles.card__chevron} />
                </Link>
                <Link className={styles.card__etherscan__link} href="/">
                  Back to landing
                  <ChevronRight className={styles.card__chevron} />
                </Link>
              </>
            )}
          </div>
        </Card>

        {error && <p className={styles.errorMessage}>{error}</p>}
      </NavModalBreadcrumbs>
    </div>
  );
};

export default Review;
