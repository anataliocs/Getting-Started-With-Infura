import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import cardStyles from '../../styles/modules/Card.module.css';

import NotificationsNavBar from '@components/notifications/NotificationsNavbar';
import Breadcrumbs from '@components/Breadcrumbs';
import Card from '@components/Card';
import LoadingSpinner from '@components/LoadingSpinner';

import useNotificationsStore from 'helpers/store_notifications';
import SubscriptionService, {
  SubscribeEvent,
} from '../api/notifications/subscribe';
import Check from '@components/icons/Check';
import ReadOnly from '@components/ReadOnly';
import { TransactionSettingsModal } from '@/components/transaction';
import Link from '@/components/Link';
import LearnMore from '@/components/LearnMore';

const Review: NextPage = () => {
  const [settingsModalIsOpen, setSettingsModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');
  const notifications = useNotificationsStore((state) => state.notifications);
  const subscribedAddress =
    useNotificationsStore((state) => state.subscribedAddress) || '';
  const addNotification = useNotificationsStore(
    (state) => state.addNotification
  );

  useEffect(() => {
    if (notifications.length) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [notifications]);

  useEffect(() => {
    if (!subscribedAddress || subscribed) {
      return;
    }

    const onData = (data: SubscribeEvent) => {
      addNotification({
        message: 'Payment Recieved',
        from: data.from,
        amount: data.value ? Number(data.value) : undefined,
        type: 'transaction',
        currency: 'ETH',
      });
    };

    SubscriptionService.subscribe(
      subscribedAddress,
      onConnect,
      onData,
      onError
    );

    return () => {
      SubscriptionService.unsubscribe();
    };
  }, [subscribedAddress, subscribed, addNotification]);

  const onConnect = () => {
    setSubscribed(true);
  };

  const onError = (error: unknown) => {
    setSubscribeError((error as Error).message);

    setTimeout(() => {
      setSubscribeError('');
    }, 5000);
  };

  const currentNotification = () => {
    return notifications[notifications.length - 1];
  };

  const currentNotificationAmountFormatted = () => {
    const notification = currentNotification();

    if (notification && notification.amount) {
      return `${notification.amount} ${notification.currency}`;
    }

    return 0;
  };

  const currentNotificationFrom = () => {
    const notification = currentNotification();

    if (notification && notification.from) {
      return notification.from;
    }

    return '';
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
            {loading ? (
              <div className="flex flex-col justify-center w-full text-center">
                <div className="flex content-center mx-auto align-middle">
                  <div>
                    <LoadingSpinner />
                  </div>
                </div>
                <p className="mt-12 text-xl">
                  Listening for transactions on{' '}
                  {subscribedAddress.substring(0, 8)}...
                </p>
              </div>
            ) : (
              <>
                <div>
                  <div className="flex">
                    <h1 className={cardStyles.card__title}>
                      Notification Recieved
                      <span className="flex items-center justify-center w-6 h-6 ml-3 text-black rounded-full bg-success">
                        <Check />
                      </span>
                    </h1>
                  </div>
                  <ReadOnly
                    label="from"
                    value={currentNotificationFrom() || '---'}
                    copyable
                  />
                  <ReadOnly
                    className="mt-4"
                    label="to"
                    value={subscribedAddress || '---'}
                    copyable
                  />
                  <ReadOnly
                    className="mt-4"
                    label="amount"
                    value={currentNotificationAmountFormatted() || '---'}
                  />
                </div>
              </>
            )}
            {subscribeError && (
              <p className="mt-12 text-red-600">{subscribeError}</p>
            )}
            {!loading ? (
              <Link className="mt-12" href="/">
                Back to home
              </Link>
            ) : (
              <></>
            )}
          </div>
        </Card>

        <LearnMore
          title="Want to Learn More?"
          links={[
            {
              label: 'Link to education',
              href: 'https://docs.infura.io/notifications',
            },
            {
              label: 'Link to education',
              href: 'https://docs.infura.io/notifications',
            },
            {
              label: 'Link to education',
              href: 'https://docs.infura.io/notifications',
            },
            {
              label: 'Link to education',
              href: 'https://docs.infura.io/notifications',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Review;
