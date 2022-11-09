import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '@styles/modules/mint/mint.module.css';
import NavModalBreadcrumbs from '@components/mint';
import Card from '@components/Card';
import NFTDemoContract from '@/compiled-contracts/NFTDemoContract.json';
import { web3 } from '@utils/mint';
import { AbiItem } from 'web3-utils';
import TextInput from '@components/TextInput';
import PrimaryButton from '@components/PrimaryButton';
import ReadOnly from '@components/ReadOnly';
import Link from '@components/Link';
import ChevronRight from '@components/icons/ChevronRight';
import axios, { AxiosError } from 'axios';
import { Transaction } from 'web3-core';

const Mint: NextPage = () => {
  const [settingsModalIsOpen, setSettingsModalIsOpen] =
    useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [tokenURI, setTokenURI] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [transactionDetails, setTransactionDetails] = useState<Transaction>();

  const submitForMinting = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const receipt = await performMinting();
      setTransactionHash(receipt);

      const tx = await fetchTransaction(receipt);
      setTransactionDetails(tx);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError('Unexpected error occured, please try again.');
      setIsLoading(false);
    }
  };

  const performMinting = async (): Promise<string> => {
    const { ethereum } = window;
    if (!ethereum) {
      throw 'We could not detect your wallet. Please download the MetaMask extension.';
    }

    const smartContractAddress = process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS;

    await ethereum.request({
      method: 'eth_requestAccounts',
    });

    const nftContract = new web3.eth.Contract(
      NFTDemoContract.abi as AbiItem[],
      smartContractAddress
    );

    try {
      const tx = {
        to: smartContractAddress,
        from: ethereum.selectedAddress,
        gas: '200000',
        data: nftContract.methods
          .mint(ethereum.selectedAddress, tokenURI)
          .encodeABI(),
      };

      const receipt = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [tx],
      });

      return receipt;
    } catch (err) {
      throw 'Oops, something went wrong minting your NFT.';
    }
  };

  const fetchTransaction = async (hash: string): Promise<Transaction> => {
    try {
      const response = await axios.post('/api/transactions/getTransaction', {
        transactionHash: hash,
      });
      return response.data?.transaction;
    } catch (err) {
      const stdErr =
        'Oops, something went wrong fetching the transaction details.';
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError;
        throw axiosErr?.response?.data.message || stdErr;
      } else {
        throw stdErr;
      }
    }
  };

  const showSuccessView = (): boolean => {
    return transactionHash !== '' && transactionDetails !== undefined;
  };

  const addTokenForm = () => {
    return (
      <div className={styles['mint__content-wrap']}>
        <h1 className={styles.mint__header}>Mint NFT</h1>
        <TextInput
          label="Metadata token URI"
          id="token-uri"
          type="text"
          placeholder="Enter IPFS metadata token URI"
          value={tokenURI}
          onChange={(e) => setTokenURI(e.currentTarget.value)}
          containerClassName={styles['mint__input-row']}
          labelClassName="bg-[#121212]"
        />
        <PrimaryButton
          className={styles['mint__primary-btn']}
          onClick={() => submitForMinting()}
          disabled={isLoading || tokenURI === ''}
          isLoading={isLoading}
        >
          Submit
        </PrimaryButton>
      </div>
    );
  };

  const mintSuccessView = () => {
    return (
      <div className={styles['mint__content-wrap']}>
        <h1 className={styles.mint__header}>Minting Successful</h1>
        <ReadOnly
          label="Transaction Hash"
          value={transactionDetails?.hash || ''}
          className={styles['mint__result-detail']}
        />
        <ReadOnly
          label="Contract ID"
          value={transactionDetails?.to || ''}
          className={styles['mint__result-detail']}
        />
        <ReadOnly
          label="From"
          value={transactionDetails?.from || ''}
          className={styles['mint__result-detail']}
        />
        <ReadOnly
          label="Gas"
          value={transactionDetails?.gas || ''}
          className={styles['mint__result-detail']}
        />
        <ReadOnly
          label="Gas Price"
          value={transactionDetails?.gasPrice || ''}
          className={styles['mint__result-detail']}
        />

        <div className="mt-10">
          <Link
            href={`https://goerli.etherscan.io/tx/${transactionHash}`}
            className={
              'mt-3 flex flex-row items-center justify-start hover-within:text-white'
            }
            target="_blank"
          >
            View Transaction on Etherscan
            <ChevronRight />
          </Link>
          <Link
            href={`https://goerli.etherscan.io/address/${
              transactionDetails?.to ||
              process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS
            }`}
            className={
              'mt-3 flex flex-row items-center justify-start hover-within:text-white'
            }
            target="_blank"
          >
            View your Smart Contract on Etherscan
            <ChevronRight />
          </Link>
          <Link
            href={`https://testnets.opensea.io/assets?search[query]=${
              transactionDetails?.to ||
              process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS
            }`}
            className={
              'mt-3 flex flex-row items-center justify-start hover-within:text-white'
            }
            target="_blank"
          >
            View your NFT Collection on OpenSea
            <ChevronRight />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Head>
        <title>Mint an NFT</title>
        <meta name="description" content="Infura Tutorial - Mint an NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavModalBreadcrumbs
        settingsModalIsOpen={settingsModalIsOpen}
        setSettingsModalIsOpen={setSettingsModalIsOpen}
      >
        <Card>{!showSuccessView() ? addTokenForm() : mintSuccessView()}</Card>
        {error && <p className={styles['mint__error-message']}>{error}</p>}
      </NavModalBreadcrumbs>
    </div>
  );
};

export default Mint;
