import create from 'zustand';
import { TransactionReceipt, Transaction } from 'web3-core';

export interface INotification {
  message: string;
  from?: string;
  amount?: number;
  currency?: 'ETH' | '';
  type: 'transaction' | 'message';
}
interface StoreState {
  notifications: INotification[];
  walletAddress: string;
  walletBalance?: number | undefined;
  transactionReceipt?: TransactionReceipt;
  transaction?: Transaction;
  subscribedAddress?: string;
  updateAddress: (address: string) => void;
  addNotification: (notification: INotification) => void;
  clearNotifications: () => void;
}

const useNotificationsStore = create<StoreState>((set) => {
  return {
    notifications: [],
    walletAddress: '',
    subscribedAddress: '',
    updateAddress: (address: string) =>
      set((state) => ({ ...state, subscribedAddress: address })),
    addNotification: (notification: INotification) =>
      set((state) => ({
        notifications: [...state.notifications, notification],
      })),
    clearNotifications: () =>
      set(() => ({
        notifications: [],
      })),
  };
});

export default useNotificationsStore;
