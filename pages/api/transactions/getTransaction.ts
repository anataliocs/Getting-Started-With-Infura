import type { NextApiRequest, NextApiResponse } from 'next';
import { web3 } from '@/utils/transaction';
import { Transaction } from 'web3-core';

interface Data {
  transaction: Transaction;
}

interface ResponseError {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ResponseError>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Only POST requests allowed',
    });
  }

  const { transactionHash } = req.body;

  try {
    // get transaction by hash
    const transaction = await web3.eth.getTransaction(transactionHash);

    return res.status(200).json({
      transaction,
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
    });
  }
}
