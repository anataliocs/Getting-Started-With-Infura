import { INotification } from 'helpers/store_notifications';

import styles from '../../styles/modules/Notifications.module.css';

const NotificationCard = ({
  message = '',
  from = '',
  currency = '',
  type = 'message',
  amount = 0,
}: INotification) => {
  const truncatedAddress = (address: string): string => {
    return address.substring(0, 9) + '...';
  };

  const formattedAmount = (amount: number): string => {
    return `${amount} ${currency}`;
  };

  const renderTransaction = () => {
    return (
      <div className={styles.transaction}>
        <div>
          <div className={styles.transaction_label}>From:</div>
          <div className={styles.transaction_value}>{truncatedAddress(from)}</div>
        </div>
        <div>
          <div className={styles.transaction_label}>Amount:</div>
          <div className={styles.transaction_value}>{formattedAmount(amount)}</div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.card}>
      <span className={styles.card_message}>{message}</span>
      {type === 'transaction' ? renderTransaction() : null}
    </div>
  );
};

export default NotificationCard;
