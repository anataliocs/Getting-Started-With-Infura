import Web3 from 'web3';
import { Subscription } from 'web3-core-subscriptions';
import { Transaction } from 'web3-core';
interface SubscribeServiceInterface {
  /**
   * Local Web3 instance
   */
  web3?: Web3;

  /**
   * Web3 Subscription Instance
   */
  subscription?: Subscription<string>;

  /**
   * Subscribe to an Eth Address for log events
   * @param address Address to subscribe to
   * @param onConnectCallback Callback to call when a connected
   * @param onDataCallback Callback to call when data is received
   * @param onErrorCallback Callback to call when an error occurs
   */
  subscribe(
    address: string,
    onConnectCallback: () => void,
    onDataCallback: (data: SubscribeEvent) => void,
    onErrorCallback: (error: unknown) => void
  ): Promise<void | undefined>;

  /**
   * Unsubscribe current subscription
   */
  unsubscribe(): Promise<void>;

  /**
   * Handle instance method errors
   * @param error Error to handle
   */
  handleError(error: unknown): void;
}

export interface SubscribeEvent {
  from: string;
  to: string;
  value: string;
  timestamp: number;
}

const TRANSACTION_TIMEOUT = 10000;

class SubscribeService implements SubscribeServiceInterface {
  web3?: Web3;
  subscription?: Subscription<string>;

  constructor() {
    this.web3 = new Web3(
      new Web3.providers.WebsocketProvider(
        `wss://${process.env.NEXT_PUBLIC_ETHEREUM_NETWORK}.infura.io/ws/v3/${process.env.WEB3_INFURA_API_KEY}`,
        { reconnect: { maxAttempts: 3, auto: true, delay: 1000 } }
      )
    );
  }

  createSubscribeEvent(tx: Transaction): SubscribeEvent {
    if (!this.web3) {
      throw new Error('Web3 instance not found');
    }

    return {
      from: tx.from,
      to: tx.to || '',
      value: this.web3.utils.fromWei(tx.value, 'ether'),
      timestamp: new Date().getTime(),
    };
  }

  onTransaction(
    txHash: string,
    address: string,
    cb: (data: SubscribeEvent) => unknown
  ) {
    return setTimeout(async () => {
      try {
        if (this.web3) {
          const tx = await this.web3.eth.getTransaction(txHash);

          if (this.isMatchingTransaction(tx, address)) {
            cb(this.createSubscribeEvent(tx));
          }
        }
      } catch (error) {
        throw error;
      }
    }, TRANSACTION_TIMEOUT);
  }

  isMatchingTransaction(tx: Transaction, address: string): boolean {
    if (this.web3) {
      return tx !== null && tx.to !== null && address === tx.to;
    }

    return false;
  }

  async subscribe(
    address: string,
    onConnectCallback: () => void,
    onDataCallback: (data: SubscribeEvent) => void,
    onErrorCallback: (error: unknown) => void
  ) {
    if (!this.web3) return;

    try {
      this.subscription = await this.web3.eth.subscribe('pendingTransactions');

      if (!this.subscription) {
        throw new Error('Subscription failed');
      }

      this.subscription.on('connected', onConnectCallback);
      this.subscription.on('error', onErrorCallback);
      this.subscription.on('data', (txHash) =>
        this.onTransaction(txHash, address, onDataCallback)
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  async unsubscribe() {
    try {
      if (this.subscription) {
        await this.subscription.unsubscribe();
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error: unknown) {
    console.log(error);
  }
}

export default new SubscribeService();
