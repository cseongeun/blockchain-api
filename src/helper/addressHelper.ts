import * as _ from 'lodash';

import { ethers } from 'ethers';
import { ZERO_ADDRESS } from './constantHelper';

export const toCheckSumAddress = (address: string): string => {
  return ethers.utils.getAddress(address);
};

export const isAddress = (address: string): boolean => {
  try {
    toCheckSumAddress(address);
    return true;
  } catch (e) {
    return false;
  }
};

export const isZeroAddress = (address: string): boolean => {
  return address === ZERO_ADDRESS;
};

export const toCheckSumAddresses = (addresses: string[]): string[] => {
  return _.map(addresses, toCheckSumAddress);
};
