import Breadcrumbs, { Breadcrumb } from '@components/Breadcrumbs';
import Document from '@components/icons/Document';
import Modal from '@components/Modal';
import Navbar from '@components/Navbar';
import ReadOnly from '@components/ReadOnly';
import SettingsButton from '@components/SettingsButton';
import TruncatedAddress from '@components/TruncatedAddress';
import WalletBalance from '@components/WalletBalance';
import Link from '@components/Link';
import useTransactionStore from '@/helpers/store_transaction';

import styles from '@styles/modules/transaction/NavModalBreadcrumbs.module.css';

interface SettingsModalProps {
  settingsModalIsOpen: boolean;
  setSettingsModalIsOpen: (isOpen: boolean) => void;
}

export const TransactionSettingsModal = ({
  settingsModalIsOpen,
  setSettingsModalIsOpen,
}: SettingsModalProps) => {
  return (
    <Modal
      isOpen={settingsModalIsOpen}
      setIsOpen={setSettingsModalIsOpen}
      title="Settings"
      description="Project settings. Current network, project api key, and documentation links."
    >
      <div className={styles.settings__container}>
        <h2 className={styles.settings__heading}>Connection Info</h2>
        {process.env.NEXT_PUBLIC_WEB3_TEST_ETHEREUM_NETWORK && (
          <ReadOnly
            label="Ethereum Network"
            value={process.env.NEXT_PUBLIC_WEB3_TEST_ETHEREUM_NETWORK}
          />
        )}
        {process.env.NEXT_PUBLIC_WEB3_INFURA_API_KEY && (
          <ReadOnly
            label="Project Secret"
            value={process.env.NEXT_PUBLIC_WEB3_INFURA_API_KEY}
            hideable
            copyable
          />
        )}
        <h3 className={styles.settings__heading}>Documentation</h3>
        <div className={styles.settings__documentation_grid}>
          <Link
            href="https://docs.infura.io/infura/networks/ethereum/tutorials/transactions/send-a-transaction"
            target="_blank"
            className={`group hover-within:text-white ${styles.settings__documentation_link}`}
          >
            <Document className={styles.settings__documentation_icon} />
            Send a Transaction Tutorial
          </Link>
          <Link
            href="https://support.mycrypto.com/how-to/getting-started/where-to-get-testnet-ether/"
            target="_blank"
            className={`group hover-within:text-white ${styles.settings__documentation_link}`}
          >
            <Document className={styles.settings__documentation_icon} />
            Test ETH Faucet
          </Link>
          <Link
            href="https://docs.infura.io/infura/networks/ethereum/json-rpc-methods/eth_getbalance"
            target="_blank"
            className={`group hover-within:text-white ${styles.settings__documentation_link}`}
          >
            <Document className={styles.settings__documentation_icon} />
            Get Account Balance
          </Link>
          <Link
            href="https://docs.infura.io/infura/networks/ethereum/json-rpc-methods/eth_sendrawtransaction"
            target="_blank"
            className={`group hover-within:text-white ${styles.settings__documentation_link}`}
          >
            <Document className={styles.settings__documentation_icon} />
            Send Transaction
          </Link>
        </div>
      </div>
    </Modal>
  );
};

interface NavbarProps {
  walletAddress?: string;
  walletBalance?: number | undefined;
  setSettingsModalIsOpen: (isOpen: boolean) => void;
}

export const TransactionNavbar = ({
  walletAddress,
  walletBalance,
  setSettingsModalIsOpen,
}: NavbarProps) => {
  return (
    <Navbar href="/">
      <div className={styles.nav__content}>
        <TruncatedAddress
          address={walletAddress}
          label="Wallet Address:"
          length={6}
        />
        <WalletBalance
          balance={
            walletBalance ? parseFloat(walletBalance.toFixed(4)) : undefined
          }
        />
        <SettingsButton onClick={() => setSettingsModalIsOpen(true)}>
          Settings
        </SettingsButton>
      </div>
    </Navbar>
  );
};

interface NavModalBreadcrumbsProps {
  children: React.ReactNode;
  settingsModalIsOpen: boolean;
  setSettingsModalIsOpen: (isOpen: boolean) => void;
  breadcrumbs?: Breadcrumb[];
}

const NavModalBreadcrumbs = ({
  children,
  settingsModalIsOpen,
  setSettingsModalIsOpen,
  breadcrumbs,
}: NavModalBreadcrumbsProps) => {
  const walletAddress = useTransactionStore((state) => state.walletAddress);
  const walletBalance = useTransactionStore((state) => state.walletBalance);

  return (
    <>
      <TransactionNavbar
        walletAddress={walletAddress}
        walletBalance={walletBalance}
        setSettingsModalIsOpen={setSettingsModalIsOpen}
      />
      <main className={styles.main}>
        <Breadcrumbs
          breadcrumbs={
            breadcrumbs || [
              { label: 'Connect', href: '/transaction/connect' },
              { label: 'Transfer', href: '/transaction/transfer' },
              { label: 'Review', href: '/transaction/review' },
            ]
          }
        />
        {children}
        <TransactionSettingsModal
          settingsModalIsOpen={settingsModalIsOpen}
          setSettingsModalIsOpen={setSettingsModalIsOpen}
        />
      </main>
    </>
  );
};

export default NavModalBreadcrumbs;
