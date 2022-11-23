import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import styles from '../styles/modules/StyleGuide.module.css';
import PrimaryButton from '../components/PrimaryButton';
import IconButton from '../components/IconButton';
import CloseIcon from '../components/icons/CloseIcon';
import ClipboardIcon from '../components/icons/ClipboardIcon';
import ArrowIcon from '../components/icons/ArrowIcon';
import Link from '../components/Link';
import ConnectButton from '../components/ConnectButton';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import TruncatedAddress from '../components/TruncatedAddress';
import WalletBalance from '../components/WalletBalance';
import SettingsButton from '../components/SettingsButton';
import Breadcrumbs from '../components/Breadcrumbs';
import Modal from '../components/Modal';
import TextInput from '../components/TextInput';
import SelectInput from '../components/SelectInput';

const StyleGuidePage: NextPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <Head>
        <title>Infura Sample Project Style Guide</title>
        <meta name="description" content="Mondo create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar>
        <div className="flex gap-16">
          <TruncatedAddress
            address="0x74BbFafd6Bc6aE3E31eEa0ad43308886eA08bB10"
            label="Account ID:"
            length={6}
          />
          <WalletBalance balance={1.0} />
          <SettingsButton>Settings</SettingsButton>
        </div>
      </Navbar>
      <main className={styles.style_guide}>
        <h1 className={styles.style_guide__header}>Style Guide</h1>
        <section className={styles.style_guide__section}>
          <h2 className={styles.style_guide__section_header}>Buttons</h2>
          <ul>
            <li>
              <PrimaryButton>Primary Button</PrimaryButton>
            </li>
            <li>
              <PrimaryButton href="/styleguide">
                Primary Button as Link
              </PrimaryButton>
            </li>
            <li>
              <IconButton>
                <CloseIcon />
              </IconButton>
            </li>
            <li>
              <IconButton>
                <ArrowIcon />
              </IconButton>
            </li>
            <li>
              <IconButton flat>
                <ClipboardIcon />
              </IconButton>
            </li>
            <li>
              <ConnectButton>Connect Wallet</ConnectButton>
            </li>
          </ul>
        </section>

        <section className={styles.style_guide__section}>
          <h2 className={styles.style_guide__section_header}>Links</h2>
          <ul>
            <li>
              <Link href="https://google.com" target="_blank">
                Basic Link
              </Link>
            </li>
          </ul>
        </section>

        <section className={styles.style_guide__section}>
          <h2 className={styles.style_guide__section_header}>Cards</h2>
          <Card containerClassName="w-full max-w-lg">
            <div className="flex items-center justify-center h-80">
              hello world
            </div>
          </Card>
        </section>

        <section className={styles.style_guide__section}>
          <h2 className={styles.style_guide__section_header}>Breadcrumbs</h2>
          <Breadcrumbs
            breadcrumbs={[
              { label: 'Connect', href: '/' },
              { label: 'Transfer', href: '/styleguide' },
              { label: 'Review', href: '/review' },
            ]}
          />
        </section>

        <section className={styles.style_guide__section}>
          <h2 className={styles.style_guide__section_header}>Modal</h2>
          <PrimaryButton onClick={() => setModalIsOpen(true)}>
            Open Modal
          </PrimaryButton>
          <Modal
            isOpen={modalIsOpen}
            setIsOpen={setModalIsOpen}
            title="Modal Example"
            description="This is an example of a modal for our styleguide"
          >
            <div>
              hello world Est nisi laboris elit et. Quis minim officia qui
              fugiat tempor aute Lorem id commodo. Est mollit nisi amet amet.
              Veniam laboris dolore do sint mollit aliquip veniam sit anim ea
              veniam veniam. Fugiat commodo incididunt commodo cupidatat anim id
              cupidatat aute esse. Eu nulla anim sit nulla magna dolore ut
              eiusmod nisi enim aliquip laboris deserunt ipsum dolore. Aute
              veniam ad aute tempor voluptate irure aliqua Lorem ad. Pariatur
              eiusmod in id est in cupidatat. Laborum ipsum exercitation dolor
              non. Consectetur exercitation laboris consequat veniam.
            </div>
          </Modal>
        </section>

        <section className={styles.style_guide__section}>
          <h2 className={styles.style_guide__section_header}>Inputs</h2>
          <form className={styles.style_guide__inputForm}>
            <TextInput
              label="address"
              id="wallet-address"
              type="text"
              placeholder="Enter a wallet address"
              helperText="Paste your MetaMask wallet public address"
              containerClassName="mb-6"
            />
            <TextInput
              label="amount"
              id="amount"
              type="text"
              placeholder="Enter an amount"
              helperText="Enter an amount to send in ETH"
              containerClassName="mb-6"
            />
            <SelectInput
              label="Select Network"
              id="network"
              options={['Ethereum', 'Goerli', 'Polygon']}
            />
          </form>
        </section>
      </main>
    </div>
  );
};

export default StyleGuidePage;
