import BigNumber from 'bignumber.js';
BigNumber.config({ EXPONENTIAL_AT: 100 });

export const toBigNumber = (value: any) => {
  return new BigNumber(value.toString());
};

export const isZero = (value: any) => {
  return new BigNumber(value.toString()).isZero();
};

export const toFixed = (value: any, point: number = 20) => {
  return new BigNumber(value.toString()).toFixed(point);
};

export const toNegated = (value: any) => {
  return new BigNumber(value.toString()).negated();
};

export const shift = (value: any, n: number) => {
  return new BigNumber(value.toString()).shiftedBy(n);
};

export const add = (a: any, b: any) => {
  return new BigNumber(a.toString()).plus(b.toString());
};

export const sub = (a: any, b: any) => {
  return new BigNumber(a.toString()).minus(b.toString());
};

export const mul = (a: any, b: any) => {
  return new BigNumber(a.toString()).multipliedBy(b.toString());
};

export const div = (a: any, b: any) => {
  return new BigNumber(a.toString()).div(b.toString());
};

export const isGreaterThan = (a: any, b: any) => {
  return new BigNumber(a.toString()).isGreaterThan(b.toString());
};

export const isGreaterThanOrEqual = (a: any, b: any) => {
  return new BigNumber(a.toString()).isGreaterThanOrEqualTo(b.toString());
};

export const isLessThan = (a: any, b: any) => {
  return new BigNumber(a.toString()).isLessThan(b.toString());
};

export const isLessThanOrEqual = (a: any, b: any) => {
  return new BigNumber(a.toString()).isLessThanOrEqualTo(b.toString());
};
