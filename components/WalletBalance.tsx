import styles from '../styles/modules/Navbar.module.css';
import EthereumIcon from './icons/EthereumIcon';

const WalletBalance = ({
  balance,
  ...props
}: {
  balance: number | undefined;
  props?: React.HTMLProps<HTMLDivElement>;
}) => {
  return (
    <>
      {balance && (
        <div className={styles.walletBalance} {...props}>
          <span>Funds:</span>
          <EthereumIcon className={styles.walletBalance__ethIcon} />
          <div className={styles.walletBalance__balance}>{balance}</div>
        </div>
      )}
    </>
  );
};

export default WalletBalance;
