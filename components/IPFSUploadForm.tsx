import { useState, DragEvent, useMemo } from 'react';
import Card from '@components/Card';
import styles from '@styles/modules/IPFSUploadForm.module.css';
import UploadIcon from '@icons/Upload';
import CloseWithBGIcon from '@icons/CloseWithBG';
import TextInput from '@components/TextInput';
import AddIcon from '@icons/Add';
import RemoveIcon from '@icons/Remove';
import PrimaryButton from '@components/PrimaryButton';
import { AddResult } from '@node_modules/ipfs-core-types/types/src/root';
import { IPFSHTTPClient } from 'ipfs-http-client';
import { ipfs_client } from '@utils/ipfs';
import Check from '@icons/Check';
import ReadOnly from '@components/ReadOnly';
import HelpText from '@components/HelpText';
import IconButton from './IconButton';

enum ValidFileTypes {
  'image/png' = 'image/png',
  'image/jpeg' = 'image/jpeg',
  'application/json' = 'application/json',
}

export enum ExtraAttributes {
  fileSize = 'fileSize',
  fileType = 'fileType',
  objectHash = 'objectHash',
}

export enum MetaDataKeys {
  traitType = 'trait_type',
  value = 'value',
}

export interface MetaData {
  [MetaDataKeys.traitType]: string;
  [MetaDataKeys.value]: string;
}

export interface IpfsMetaObject {
  name: string;
  description: string;
  image: string;
  attributes: MetaData[];
}

const MAX_META_ROWS = 10;

const IPFSUploadForm = ({
  nextPageHref,
  setError,
}: {
  nextPageHref: string;
  setError: (err: string) => void;
}) => {
  const [fileData, setFileData] = useState<File | null>(null);
  const [metaName, setMetaName] = useState<string>('');
  const [metaDescription, setMetaDescription] = useState<string>('');
  const [metaDataList, setMetaDataList] = useState<MetaData[]>([
    { [MetaDataKeys.traitType]: '', [MetaDataKeys.value]: '' },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [metaHash, setMetaHash] = useState<string>('');
  const [uploadSuccessful, setUploadSuccessful] = useState<boolean>(false);

  const client: IPFSHTTPClient | undefined = useMemo(() => {
    return ipfs_client();
  }, []);

  const handleFileUpload = async (): Promise<void> => {
    if (!fileData) {
      return;
    }

    try {
      setIsLoading(true);
      const objectResponse = await ipfs_add(fileData);
      if (!objectResponse) {
        throw 'Failed to upload object';
      }

      const metaObject: IpfsMetaObject | undefined = buildMetaObject(
        objectResponse.path
      );
      if (!metaObject) {
        throw 'Failed to construct meta object';
      }

      const metaResponse = await ipfs_add(JSON.stringify(metaObject));

      if (!metaResponse) {
        throw 'Faild to upload meta object';
      }

      setMetaHash(metaResponse.path);
      setUploadSuccessful(true);
    } catch (err) {
      setIsLoading(false);
      setUploadSuccessful(false);
      setError('Unexpected error occured, please try again.');
    }
  };

  const ipfs_add = async (
    uploadData: File | string
  ): Promise<AddResult | undefined> => {
    if (client) {
      try {
        const response: AddResult = await client.add(uploadData);
        return response;
      } catch (err) {
        console.log(err);
      }
    }
  };

  const buildMetaObject = (objectHash: string): IpfsMetaObject | undefined => {
    if (!fileData) {
      return;
    }

    const fileteredMetadata = metaDataList.filter((el) => {
      if (el[MetaDataKeys.traitType] !== '' && el[MetaDataKeys.value] !== '') {
        return {
          [MetaDataKeys.traitType]: el[MetaDataKeys.traitType].replace(
            /\s/g,
            ''
          ),
          [MetaDataKeys.value]: el[MetaDataKeys.value],
        };
      }
    });

    const metaObject: IpfsMetaObject = {
      name: metaName,
      description: metaDescription,
      image: `https://cloudflare-ipfs.com/ipfs/${objectHash}`,
      attributes: [
        ...fileteredMetadata,
        {
          [MetaDataKeys.traitType]: ExtraAttributes.fileSize,
          [MetaDataKeys.value]: calculateFileSize(fileData.size),
        },
        {
          [MetaDataKeys.traitType]: ExtraAttributes.fileType,
          [MetaDataKeys.value]: ValidFileTypes[fileData.type as ValidFileTypes],
        },
        {
          [MetaDataKeys.traitType]: ExtraAttributes.objectHash,
          [MetaDataKeys.value]: objectHash,
        },
      ],
    };

    return metaObject;
  };

  const handleFileDrop = (e: DragEvent<HTMLDivElement>): void | undefined => {
    e.nativeEvent.preventDefault();
    if (e.nativeEvent.dataTransfer?.files) {
      const file = e.nativeEvent.dataTransfer.files[0];
      if (!validFile(file.type)) {
        const errorMsg = 'Attempting to upload an unsupported file type';
        setError(errorMsg);
        return;
      }

      setFileData(file);
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      const file = files[0];
      if (!validFile(file.type)) {
        setError('Attempting to upload an unsupported file type');
        return;
      }

      setFileData(file);
    }
  };

  const validFile = (type: string): boolean => {
    const typeStrings: string[] = Object.values(ValidFileTypes);
    return typeStrings.includes(type);
  };

  const calculateFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const decimals = 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return (
      parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i]
    );
  };

  const handleFileReset = (): void => {
    setFileData(null);
  };

  const setMetaItem = (
    e: React.FormEvent<HTMLInputElement>,
    index: number,
    key: MetaDataKeys
  ): void => {
    const metaList: MetaData[] = [...metaDataList];
    metaList[index][key] = e.currentTarget.value;
    setMetaDataList(metaList);
  };

  const addSubtractButton = (index: number) => {
    if (metaDataList.length > 1) {
      if (index + 1 === metaDataList.length) {
        return (
          <div className={styles['ipfs__meta-buttons']}>
            <IconButton onClick={() => removeMetaRow(index)} flat>
              <RemoveIcon />
            </IconButton>
            <IconButton onClick={() => addMetaRow()} flat>
              <AddIcon />
            </IconButton>
          </div>
        );
      } else {
        return (
          <div className={styles['ipfs__meta-buttons']}>
            <IconButton onClick={() => removeMetaRow(index)} flat>
              <RemoveIcon />
            </IconButton>
          </div>
        );
      }
    } else {
      return (
        <div className={styles['ipfs__meta-buttons']}>
          <IconButton onClick={() => addMetaRow()} flat>
            <AddIcon />
          </IconButton>
        </div>
      );
    }
  };

  const addMetaRow = (): void => {
    if (metaDataList.length === MAX_META_ROWS) {
      return setError('Maximum number of meta rows reached');
    }

    const metaList: MetaData[] = [...metaDataList];
    metaList.push({ [MetaDataKeys.traitType]: '', [MetaDataKeys.value]: '' });
    setError('');
    setMetaDataList(metaList);
  };

  const removeMetaRow = (index: number): void => {
    const metaList: MetaData[] = [...metaDataList];
    metaList.splice(index, 1);
    setMetaDataList(metaList);
    setError('');
  };

  const uploadReady = (): boolean => {
    return !!fileData && metaName !== '' && metaDescription !== '';
  };

  const imagePreview = (): JSX.Element | undefined => {
    if (!fileData) {
      return;
    }

    const url = window.URL.createObjectURL(fileData);
    return (
      <div
        style={{ backgroundImage: `url(${url})` }}
        className={styles['ipfs__image-preview--short']}
      />
    );
  };

  const uploadForm = (): JSX.Element => {
    return (
      <div className={styles['ipfs__content-wrap']}>
        <h1 className={styles.ipfs__header}>Upload Document</h1>

        <div
          className={styles.ipfs__dropBox}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleFileDrop(e)}
        >
          {!fileData && (
            <div
              className={styles['ipfs__drop-box']}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleFileDrop(e)}
            >
              <p className={styles['ipfs__upload-text']}>
                Drag and drop a file to upload
              </p>
              <input
                type="file"
                className={styles['ipfs__file-input']}
                onChange={(e) => handleFileSelect(e.currentTarget.files)}
              />
              <p className={styles['ipfs__file-format-text']}>
                File types supported png, jpg, json
              </p>
              <UploadIcon />
            </div>
          )}

          {!!fileData && (
            <div className={styles['ipfs__file-added']}>
              <p className={styles['ipfs__added-text']}>File Added</p>
              {imagePreview()}
              <p className={styles['ipfs__file-name']}>{fileData.name}</p>
              <p className={styles['ipfs__file-size']}>
                {calculateFileSize(fileData.size)}
              </p>
              <IconButton
                onClick={handleFileReset}
                className={styles['ipfs__close-icon']}
                flat
              >
                <CloseWithBGIcon />
              </IconButton>
            </div>
          )}
        </div>

        <p className={styles.ipfs__subheader}>File Details</p>

        <div className={styles['ipfs__file-details']}>
          <TextInput
            label="Name"
            id="ipfs-name"
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setMetaName(e.currentTarget.value)}
            value={metaName}
            containerClassName={styles['ipfs__input-row']}
            labelClassName="bg-[#0E0E0E]"
          />

          <TextInput
            label="Description"
            id="ipfs-description"
            type="text"
            placeholder="Enter Description"
            onChange={(e) => setMetaDescription(e.currentTarget.value)}
            value={metaDescription}
            containerClassName={styles['ipfs__input-row']}
            labelClassName="bg-[#0A0A0A]"
          />
        </div>

        <p className={styles.ipfs__subheader}>Metadata</p>

        {metaDataList.map((data, index) => {
          return (
            <div className={styles['ipfs__meta-row']} key={`meta-row-${index}`}>
              <TextInput
                label="Attribute Name"
                id={`meta-name-${index}`}
                type="text"
                placeholder="Enter Attribute Name"
                value={data[MetaDataKeys.traitType]}
                onChange={(e) => setMetaItem(e, index, MetaDataKeys.traitType)}
                containerClassName={styles['ipfs__meta-input']}
                labelClassName="bg-[#060606]"
              />
              <TextInput
                label="Attribute Value"
                id={`meta-value-${index}`}
                type="text"
                placeholder="Enter Attribute Value"
                value={data[MetaDataKeys.value]}
                onChange={(e) => setMetaItem(e, index, MetaDataKeys.value)}
                containerClassName={styles['ipfs__meta-input']}
                labelClassName="bg-[#060606]"
              />
              {addSubtractButton(index)}
            </div>
          );
        })}

        <PrimaryButton
          className={styles['ipfs__primary-btn']}
          onClick={handleFileUpload}
          disabled={isLoading || !uploadReady()}
          isLoading={isLoading}
        >
          Upload
        </PrimaryButton>
      </div>
    );
  };

  const uploadSuccessView = (): JSX.Element | undefined => {
    if (!fileData) {
      setUploadSuccessful(false);
      return;
    }

    const objectUrl = URL.createObjectURL(fileData);
    return (
      <div className={styles['ipfs__content-wrap']}>
        <div className={'flex flex-row'}>
          <h1 className={styles.ipfs__header}>Upload Successful</h1>
          <span className="flex items-center justify-center w-6 h-6 ml-3 text-black rounded-full bg-success">
            <Check />
          </span>
        </div>
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
              label="File Name"
              value={fileData.name}
            />
            <ReadOnly label="Size" value={calculateFileSize(fileData.size)} />
          </div>
          <div className={styles['ipfs__image-details--rows']}>
            <ReadOnly label="Name" value={metaName} />
          </div>
          <div className={styles['ipfs__image-details--columns']}>
            <ReadOnly label="IPFS Hash" value={metaHash} copyable />
            <HelpText className={styles['ipfs__help-text']}>
              Copy the IPFS hash to view more details on the next step
            </HelpText>
          </div>
        </div>
        <PrimaryButton
          className={styles['ipfs__primary-btn']}
          href={nextPageHref}
        >
          Next
        </PrimaryButton>
      </div>
    );
  };

  return <Card>{!uploadSuccessful ? uploadForm() : uploadSuccessView()}</Card>;
};

export default IPFSUploadForm;
