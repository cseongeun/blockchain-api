import { ethers } from 'ethers';
import { Provider } from '@ethersproject/providers';
import { getBatchChainLinkData } from './multicallHelper';

export const getPrice = async (provider: Provider, feedAddress: string) => {
  const { 1: answer } = await new ethers.Contract(feedAddress, AGGREGATOR_V3_ABI, provider).latestRoundData();
  return answer;
};

export const getPrices = async (provider: Provider, multiCallAddress: string, feedAddresses: string[]) => {
  const chainLinkData = await getBatchChainLinkData(provider, multiCallAddress, feedAddresses);
  return chainLinkData;
};

export const AGGREGATOR_V3_ABI = [
  {
    inputs: [],
    name: 'latestRoundData',
    outputs: [
      { internalType: 'uint80', name: 'roundId', type: 'uint80' },
      { internalType: 'int256', name: 'answer', type: 'int256' },
      { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
      { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
      { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
