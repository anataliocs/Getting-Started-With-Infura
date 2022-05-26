import { useEffect, useRef, useState } from 'react';

import IconButton from '@components/IconButton';
import Bell from '@components/icons/Bell';
import NotificationCard from './NotificationCard';

import useNotificationsStore, {
  INotification,
} from 'helpers/store_notifications';

import styles from '../../styles/modules/Notifications.module.css';

const NotificationModule = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const notifications = useNotificationsStore((state) => state.notifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCount, setShowCount] = useState(true);

  useEffect(() => {
    if (notifications.length && !showNotifications) {
      setShowCount(true);
    }
  }, [notifications, showNotifications]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setShowNotifications, showNotifications]);

  const notificationsCount = (): number => {
    return notifications.length;
  };

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    setShowCount(false);
  };

  return (
    <div className={styles.notification_module} ref={ref}>
      <div className={styles.bell}>
        <IconButton className={styles.bell_btn} flat onClick={handleBellClick}>
          <Bell />
        </IconButton>
        {showCount && notifications.length > 0 ? (
          <div className={styles.bell_count}>{notificationsCount()}</div>
        ) : (
          <></>
        )}
        {showNotifications && !notifications.length && (
          <div className={styles.card_container}>
            <div className={styles.card_wrapper}>
              <NotificationCard message="No Notifications" type="message" />
            </div>
          </div>
        )}
        {showNotifications && notifications.length ? (
          <div className={styles.card_container}>
            {[...new Set(notifications)].map(
              (notification: INotification, i) => (
                <div
                  className={styles.card_wrapper}
                  style={{ animationDuration: `${(i + 1) * 500}ms` }}
                  key={i}
                >
                  <NotificationCard {...notification} />
                </div>
              )
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NotificationModule;
