import axios from 'axios';
import { Provider } from '@ethersproject/providers';
import { random } from '@helper/crypto.helper';
import { toHexString } from '@helper/format.helper';
import { isZeroAddress } from './addressHelper';
import { parseLog } from './encodeDecodeHelper';

const _extractConnection = (provider: Provider) => {
  const extractProviderInfo = JSON.parse(JSON.stringify(provider)).connection;
  return extractProviderInfo;
};

const _generateEventCallData = (
  address: string,
  topics: string[],
  periods: number[][],
) => {
  const data = periods.map(([startBlock, endBlock]) => {
    const body: any = {
      method: 'eth_getLogs',
      params: [
        {
          fromBlock: toHexString(startBlock),
          toBlock: toHexString(endBlock),
          topics,
        },
      ],
      id: random(),
      jsonrpc: '2.0',
    };

    if (!isZeroAddress(address)) body.params[0].address = address;

    return body;
  });
  return data;
};

export const getBatchEventLogs = async (
  provider: Provider,
  address: string,
  abi: any,
  topics: string[],
  periods: number[][],
  metadata: boolean = true,
) => {
  try {
    const connection = _extractConnection(provider);
    const callData = _generateEventCallData(address, topics, periods);
    const config = {
      method: 'get',
      ...connection,
      data: callData,
    };

    const { data } = await axios(config);
    return Promise.all(
      data.map(async (response) => {
        console.log(response);
        return Promise.all(
          response.result.map(async (event) => {
            const parsed = parseLog(abi, event);

            if (metadata) {
              const { blockNumber, transactionHash } = event;
              const { timestamp } = await provider.getBlock(blockNumber);
              return {
                ...parsed.args,
                blockNumber,
                transactionHash,
                timestamp,
              };
            }

            return {
              ...parsed.args,
            };
          }),
        );
      }),
    );
  } catch (e) {
    throw new Error('Expected rpc error.');
  }
};
