import type { NextApiRequest, NextApiResponse } from 'next';
import { web3 } from '@/utils/transaction';

interface Data {
  balance: number;
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

  const { accountAddress } = req.body;

  const balanceWei = await web3.eth.getBalance(accountAddress);
  const balanceEther = await web3.utils.fromWei(balanceWei, 'ether');
  const balanceEtherNumber: number = +balanceEther;

  return res.status(200).json({
    balance: balanceEtherNumber,
  });
}
