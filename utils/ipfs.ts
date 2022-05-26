import { IPFSHTTPClient, create } from 'ipfs-http-client';

const URL: string | undefined = process.env.NEXT_PUBLIC_INFURA_IPFS_ENDPOINT;
const PROJECT_ID: string | undefined =
  process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID;
const PROJECT_SECRET: string | undefined =
  process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET;

export const ipfs_client = (): IPFSHTTPClient | undefined => {
  if (!URL || !PROJECT_ID || !PROJECT_SECRET) {
    console.log('no env');
    return undefined;
  }

  return create({
    url: URL,
    protocol: 'https',
    headers: {
      authorization:
        'Basic ' +
        Buffer.from(PROJECT_ID + ':' + PROJECT_SECRET).toString('base64'),
    },
  });
};
