import { web3 } from '@utils/mint';
import { AbiItem } from 'web3-utils';
import NFTDemoContract from '@/compiled-contracts/NFTDemoContract.json';
// import Web3 from 'web3';

const contract = require('@truffle/contract');

const contractInterface = () => {
  const smartContractAddress = process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS;
  const nftContract = new web3.eth.Contract(
    NFTDemoContract.abi as AbiItem[],
    smartContractAddress
  );

  const nftContract_two = contract(NFTDemoContract, smartContractAddress);
  nftContract_two.setProvider(web3.eth.currentProvider);

  const mint = async (address: string, token: string): Promise<any> => {
    const response = await nftContract.methods.mint(address, token).call();
    return response;
  };

  const mint_two = async (address: string, tokenURI: string) => {
    // return nftContract
    const instance = await nftContract_two.deployed();
    const result = instance.mint(address, tokenURI, { from: address });
    console.log(result);
    return result;
  };

  return {
    contractInstance: nftContract,
    contractInstance_two: nftContract_two,
    mint: mint,
    mint_two: mint_two,
  };
};

export default contractInterface;
