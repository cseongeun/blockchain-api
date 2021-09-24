import crypto from 'crypto';

export const random = (a: number = 0, b: number = 10000000) => {
  return crypto.randomInt(0, 10000000);
};
