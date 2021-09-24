import { isZero, shift } from './bignumberHelper';

export const multiplyDecimals = (value: any, decimals: number) => {
  if (isZero(value)) return value;
  return shift(value.toString(), decimals);
};

export const divideDecimals = (value: any, decimals: number) => {
  if (isZero(value)) return value;
  return shift(value.toString(), decimals * -1);
};
