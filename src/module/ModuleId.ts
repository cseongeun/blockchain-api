import * as crypto from 'crypto';

export const getModuleId = (name: string, chainId: number): string => {
  return crypto.createHash('md5').update(`${name}.${chainId}`).digest('hex');
}