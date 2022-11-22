import { useState, useMemo } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import NavModalBreadcrumbs from '@components/ipfs';
import Card from '@components/Card';
import { IPFSHTTPClient } from 'ipfs-http-client';
import { ipfs_client } from '@utils/ipfs';
import {
  IpfsMetaObject,
  MetaData,
  MetaDataKeys,
  ExtraAttributes,
} from '@/components/IPFSUploadForm';
import styles from '@styles/modules/ipfs/ipfs.module.css';
import TextInput from '@components/TextInput';
import PrimaryButton from '@components/PrimaryButton';
import ReadOnly from '@components/ReadOnly';
import Link from '@components/Link';
import ChevronRight from '@components/icons/ChevronRight';

const Display: NextPage = () => {
  const [settingsModalIsOpen, setSettingsModalIsOpen] =
    useState<boolean>(false);
  const [metaHash, setMetaHash] = useState<string>('');
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<IpfsMetaObject | null>(null);
  const [objectUrl, setObjectUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const client: IPFSHTTPClient | undefined = useMemo(() => {
    return ipfs_client();
  }, []);

  const requestAllData = async (): Promise<void> => {
    if (metaHash === '') {
      return;
    }

    try {
      setIsLoading(true);
      const metaResponse = await ipfs_get(metaHash);
      if (!metaResponse) {
        throw 'Error retrieving IPFS metadata object';
      }

      const metaString = String.fromCharCode.apply(
        null,
        Array.from(metaResponse)
      );
      const metaJson: IpfsMetaObject = JSON.parse(metaString);
      setMetadata(metaJson);

      const objectHash = getAttributeValue('objectHash', metaJson);
      if (!objectHash) {
        throw 'Error retrieving IPFS object, hash not found';
      }

      const objectResponse = await ipfs_get(objectHash);
      if (!objectResponse) {
        throw 'Error retrieving IPFS object';
      }

      const url = convertToObjectUrl(objectResponse);
      setObjectUrl(url);
      setIsLoading(false);
      setDataLoaded(true);
    } catch (err) {
      setError('Unexpected error occured, please try again.');
      setIsLoading(false);
      setDataLoaded(false);
    }
  };

  const ipfs_get = async (hash: string): Promise<Uint8Array | undefined> => {
    if (client) {
      try {
        const response: Uint8Array[] = [];
        let responseLength = 0;

        for await (const buf of client.cat(hash)) {
          response.push(buf);
          responseLength += buf.length;
        }

        if (responseLength) {
          const mergedArray = new Uint8Array(responseLength);

          let offset = 0;
          response.map((el) => {
            mergedArray.set(el, offset);
            offset += el.length;
          });

          return mergedArray;
        }
      } catch (err) {
        setError('Unexpected error occured, please try again.');
      }
    }
  };

  const convertToObjectUrl = (objectData: Uint8Array): string => {
    // HANDLE AN IMAGE & VIDEO
    const blob = new Blob([objectData.buffer]);
    const url = window.URL.createObjectURL(blob);
    return url;

    // HANDLE A PDF
    // const blob = new Blob([mergedArray.buffer], {type: 'application/pdf'});
    // const url = window.URL.createObjectURL(blob)
  };

  const getAttributeValue = (
    trait: string,
    metaJson?: IpfsMetaObject
  ): string => {
    const data = metaJson || metadata;
    const attribute = data?.attributes.find(
      (el) => el[MetaDataKeys.traitType] === trait
    );
    return attribute?.[MetaDataKeys.value] || '';
  };

  const filteredAttributes = (): MetaData[] => {
    if (!metadata) {
      return [];
    }
    return metadata?.attributes.filter((el) => {
      const trait = el[MetaDataKeys.traitType];
      if (
        trait !== ExtraAttributes.fileSize &&
        trait !== ExtraAttributes.fileType &&
        trait !== ExtraAttributes.objectHash
      ) {
        return el;
      }
    });
  };

  const hashForm = (): JSX.Element => {
    return (
      <div className={styles['ipfs__content-wrap']}>
        <h1 className={styles.ipfs__header}>Display File</h1>
        <TextInput
          label="IPFS Hash"
          id="ipfs-hash"
          type="text"
          placeholder="Enter IPFS Hash"
          value={metaHash}
          onChange={(e) => setMetaHash(e.currentTarget.value)}
          containerClassName={styles['ipfs__input-row']}
          labelClassName="bg-[#121212]"
        />
        <PrimaryButton
          className={styles['ipfs__primary-btn']}
          onClick={() => requestAllData()}
          disabled={isLoading || metaHash === ''}
          isLoading={isLoading}
        >
          Submit
        </PrimaryButton>
      </div>
    );
  };

  const resultDisplay = (): JSX.Element | undefined => {
    if (!metadata || !objectUrl) {
      return;
    }
    return (
      <div className={styles['ipfs__content-wrap']}>
        <h1 className={styles.ipfs__header}>Display File</h1>
        <p className={styles.ipfs__subheader}>Image</p>
        <div
          style={{ backgroundImage: `url(${objectUrl})` }}
          className={styles['ipfs__image-preview']}
        />
        <p className={styles.ipfs__subheader}>Details</p>
        <div className={styles['ipfs__image-details']}>
          <div className={styles['ipfs__image-details--rows']}>
            <ReadOnly
              className={styles['ipfs__grid-data--left']}
              label="Name"
              value={metadata.name}
            />
            <ReadOnly label="Size" value={getAttributeValue('fileSize')} />
          </div>
          <div className={styles['ipfs__image-details--columns']}>
            <ReadOnly
              label="IPFS Hash"
              value={getAttributeValue('objectHash')}
              copyable
            />
          </div>
          <div className={styles['ipfs__image-details--columns']}>
            <ReadOnly label="Description" value={metadata.description} />
          </div>
        </div>
        <p className={styles['ipfs__data-header']}>Attributes</p>
        <div>
          {filteredAttributes().map((el: MetaData, index: number) => {
            return (
              <div
                key={`meta-item-${index}`}
                className={styles['ipfs__meta-result-row']}
              >
                <p className={styles['ipfs__grid-data--left']}>
                  {el[MetaDataKeys.traitType]}
                </p>
                <p>{el[MetaDataKeys.value]}</p>
              </div>
            );
          })}
        </div>
        <div className={styles['ipfs__hr']} />
        <div className="text-center">
          <p className="mt-5">
            Congrats on finishing the tutorial, to view more information on your
            file view on IPFS
          </p>
          <Link
            href={`https://chris-anatalio.infura-ipfs.io/ipfs/${getAttributeValue(
              'objectHash'
            )}`}
            target="_blank"
            className={`mt-3 flex flex-row items-center justify-center hover-within:text-white ${styles.settings__documentation_link}`}
          >
            View file on IPFS
            <ChevronRight />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Head>
        <title>Upload with IPFS - Display</title>
        <meta
          name="description"
          content="Sample Project - Upload with IPFS - Display Step"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavModalBreadcrumbs
        settingsModalIsOpen={settingsModalIsOpen}
        setSettingsModalIsOpen={setSettingsModalIsOpen}
      >
        <Card containerClassName={styles.ipfs__card}>
          {!dataLoaded ? hashForm() : resultDisplay()}
        </Card>
        {error && <p className={styles['ipfs__error-message']}>{error}</p>}
      </NavModalBreadcrumbs>
    </div>
  );
};

export default Display;
