import { BigNumber, ethers } from 'ethers';
import { toBigNumber } from './bignumberHelper';
import { getOctetOptions } from './octet.helper';

export const toCommify = (amount: number | string | BigNumber): string => {
  return ethers.utils.commify(amount.toString());
};

export const bytes32ToString = (bytes32: string): string => {
  return ethers.utils.parseBytes32String(bytes32);
};

export const stringToBytes32 = (string: string): string => {
  return ethers.utils.formatBytes32String(string);
};

export const toHexString = (value: any): string => {
  return ethers.utils.hexStripZeros(BigNumber.from(value).toHexString());
};

export const hexadecimalToNumber = (value: string) => {
  return toBigNumber(value).toString();
};
