import Breadcrumbs from '@components/Breadcrumbs';
import Document from '@components/icons/Document';
import Modal from '@components/Modal';
import Navbar from '@components/Navbar';
import ReadOnly from '@components/ReadOnly';
import SettingsButton from '@components/SettingsButton';
import Link from '@components/Link';

import styles from '@styles/modules/transaction/NavModalBreadcrumbs.module.css';

interface SettingsModalProps {
  settingsModalIsOpen: boolean;
  setSettingsModalIsOpen: (isOpen: boolean) => void;
}

export const IpfsSettingsModal = ({
  settingsModalIsOpen,
  setSettingsModalIsOpen,
}: SettingsModalProps) => {
  return (
    <Modal
      isOpen={settingsModalIsOpen}
      setIsOpen={setSettingsModalIsOpen}
      title="Settings"
      description="Project settings. Project ID, project secret, and documentation links."
    >
      <div className={styles.settings__container}>
        <h2 className={styles.settings__heading}>Connection Info</h2>
        {process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID && (
          <ReadOnly
            label="Project ID"
            value={process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID}
            hideable
            copyable
          />
        )}
        {process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET && (
          <ReadOnly
            label="Project Secret"
            value={process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET}
            hideable
            copyable
          />
        )}
        {process.env.NEXT_PUBLIC_INFURA_IPFS_ENDPOINT && (
          <ReadOnly
            label="IPFS API Endpoint"
            value={process.env.NEXT_PUBLIC_INFURA_IPFS_ENDPOINT}
            copyable
          />
        )}
        <h3 className={styles.settings__heading}>Documentation</h3>
        <div className={styles.settings__documentation_grid}>
          <Link
            href="https://docs.infura.io/infura/networks/ipfs"
            target="_blank"
            className={`group hover-within:text-white ${styles.settings__documentation_link}`}
          >
            <Document className={styles.settings__documentation_icon} />
            Infura IPFS docs
          </Link>
          <Link
            href="https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client"
            target="_blank"
            className={`group hover-within:text-white ${styles.settings__documentation_link}`}
          >
            <Document className={styles.settings__documentation_icon} />
            ipfs-http-client docs
          </Link>
        </div>
      </div>
    </Modal>
  );
};

interface NavbarProps {
  setSettingsModalIsOpen: (isOpen: boolean) => void;
}

export const IpfsNavbar = ({ setSettingsModalIsOpen }: NavbarProps) => {
  return (
    <Navbar href="/ipfs">
      <div className="flex gap-16">
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
}

const NavModalBreadcrumbs = ({
  children,
  settingsModalIsOpen,
  setSettingsModalIsOpen,
}: NavModalBreadcrumbsProps) => {
  return (
    <>
      <IpfsNavbar setSettingsModalIsOpen={setSettingsModalIsOpen} />
      <main className={styles.main}>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Upload', href: '/ipfs/upload' },
            { label: 'Display', href: '/ipfs/display' },
          ]}
        />
        {children}
        <IpfsSettingsModal
          settingsModalIsOpen={settingsModalIsOpen}
          setSettingsModalIsOpen={setSettingsModalIsOpen}
        />
      </main>
    </>
  );
};

export default NavModalBreadcrumbs;
