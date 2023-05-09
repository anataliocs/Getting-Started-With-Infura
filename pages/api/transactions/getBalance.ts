import type { NextApiRequest, NextApiResponse } from 'next';
import { web3 } from '@/utils/transaction';

interface Data {
  balance: number;
}

interface ResponseError {
  message: string;
}

/*
    Challenge 3:  Create an API Route with a Next.js Request handler for a POST request at the endpoint
    /transactions/getBalance that accepts a parameter, account address in the request body.
    Use the web3.js function getBalance() to look up the balance of that account address in wei
    then convert the value in wei to Ether and return a 200 OK with the balance.
 */


