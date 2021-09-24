import { ethers } from 'ethers';
import { Provider } from '@ethersproject/providers';
import { isNull } from '@helper/type.helper';
import { getOctetOptions } from '@helper/octet.helper';
import { ZERO_ADDRESS } from './constantHelper';
import { NetworkShape } from '@model/Network';
import { NodeType } from '@model/common/constants';

export const generateHttpProvider = (network: NetworkShape) => {
  const tempHTTPProviders: Provider[] = [];

  const { http } = network;
  if (isNull(http)) return [];

  // TODO: Node Health Check
  for (const { type, url } of http) {
    if (!isNull(type) && !isNull(url)) {
      if (type === NodeType.OCTET) {
        tempHTTPProviders.push(
          new ethers.providers.JsonRpcProvider({
            url,
            ...getOctetOptions(),
          }),
        );
      } else {
        tempHTTPProviders.push(new ethers.providers.JsonRpcProvider({ url }));
      }
    }
  }

  return tempHTTPProviders;
};

export const generateWssProvider = (network: NetworkShape) => {
  const tempWSSProviders: Provider[] = [];

  const { wss } = network;
  if (isNull(wss)) return [];

  // TODO: Node Health Check
  for (const { type, url } of wss) {
    if (!isNull(type) && !isNull(url)) {
      if (type === NodeType.OCTET) {
      } else {
        tempWSSProviders.push(new ethers.providers.WebSocketProvider(url));
      }
    }
  }
  return tempWSSProviders;
};

export const checkHealth = (provider: Provider) => {
  // blockNumber
  try {
    provider.getBlockNumber();
  } catch (e) {
    return false;
  }
  // balance
  try {
    provider.getBalance(ZERO_ADDRESS);
  } catch (e) {
    return false;
  }

  try {
  } catch (e) {}

  return true;
};
