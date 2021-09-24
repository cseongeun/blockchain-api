import * as _ from 'lodash';
import { ethers } from 'ethers';
import { arrayify } from '@ethersproject/bytes';
import { NULL_BYTE } from './constantHelper';

export const isNull = (value: any): boolean => {
  try {
    return _.isNull(value);
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const isUndefined = (value: any): boolean => {
  try {
    return _.isUndefined(value);
  } catch (e) {
    return false;
  }
};

export const isNumber = (value: any): boolean => {
  try {
    return _.isNumber(value);
  } catch (e) {
    return false;
  }
};

export const isBytes32 = (value: any): boolean => {
  try {
    const data = arrayify(value);
    if (data.length !== 32 || data[31] !== 0) throw new Error();
    return ethers.utils.isBytesLike(value);
  } catch (e) {
    return false;
  }
};

export const isNullBytes = (value: string): boolean => {
  return value === NULL_BYTE;
};

export const isNaN = (value: any): boolean => {
  try {
    return _.isNaN(value);
  } catch (e) {
    return false;
  }
};

export const isJSON = (value: any): boolean => {
  try {
    JSON.parse(JSON.stringify(value));
  } catch (e) {
    return false;
  }
  return true;
};
