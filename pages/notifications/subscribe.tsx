import Head from 'next/head';
import { FormEvent, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import cardStyles from '../../styles/modules/Card.module.css';

import NotificationsNavBar from '@components/notifications/NotificationsNavbar';
import Card from '@components/Card';
import TextInput from '@components/TextInput';
import PrimaryButton from '@components/PrimaryButton';
import Breadcrumbs from '@components/Breadcrumbs';
import { TransactionSettingsModal } from '@/components/transaction';

import useNotificationsStore from 'helpers/store_notifications';

const Subscribe: NextPage = () => {
  const [subscribeAddress, setSubscribeAddress] = useState('');
  const [subscribeError, setSubscribeError] = useState('');
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const updateAddress = useNotificationsStore((state) => state.updateAddress);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribeError('');
    setLoading(true);
    updateAddress(subscribeAddress);
    router.push('/notifications/review');
  };

  return (
    <div>
      <Head>
        <title>Infura - Notifications</title>
        <meta name="description" content="Infura Tutorial - Notifications" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NotificationsNavBar
        onSettingsClick={() => setSettingsModalIsOpen(!settingsModalIsOpen)}
      />

      <div className="container m-auto max-w-[56rem]">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Connect', href: '/notifications/connect' },
            { label: 'Subscribe', href: '/notifications/subscribe' },
            {
              label: 'Review',
              href: '/notifications/review',
            },
          ]}
        />
        <TransactionSettingsModal
          settingsModalIsOpen={settingsModalIsOpen}
          setSettingsModalIsOpen={setSettingsModalIsOpen}
        />
        <Card>
          <div className={cardStyles.card__content}>
            <>
              <h1 className={cardStyles.card__title}>
                Subscribe to an ETH Address
              </h1>
              <form onSubmit={handleSubmit} className={cardStyles.card__form}>
                <TextInput
                  label="Address"
                  placeholder="Subscription Address"
                  value={subscribeAddress}
                  containerClassName={cardStyles.card__input}
                  labelClassName={cardStyles.card__input1_label}
                  helperText="Enter the address you want to subscribe to"
                  onChange={(event) => {
                    const target = event.target as HTMLInputElement;
                    setSubscribeAddress(target.value);
                  }}
                />

                {subscribeError && (
                  <p className={cardStyles.card__error}>{subscribeError}</p>
                )}

                <PrimaryButton
                  className={cardStyles.card__button}
                  type="submit"
                  isLoading={loading}
                  disabled={!!subscribeError}
                >
                  Submit
                </PrimaryButton>
              </form>
            </>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Subscribe;
