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
    {/*
        Challenge 5:  Create a function that executes an eth_sendTransaction request that sends
        Ether to the destination address entered into the input box.
    */}

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

                {/*
                    Challenge 4:  Create a form to initiate a transaction.  Create two input boxes,
                    one for the destination address and the second for the amount to send in Ether.

                    Then define a onSubmit handler that calls the function defined in Challenge 5.

                */}


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
