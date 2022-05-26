import create from 'zustand';
import { Transaction } from 'web3-core';

interface StoreState {
  walletAddress: string;
  walletBalance?: number | undefined;
  transaction?: Transaction;
}

const useTransactionStore = create<StoreState>(() => {
  return {
    walletAddress: '',
  };
});

export default useTransactionStore;
