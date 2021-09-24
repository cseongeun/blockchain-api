import { ethers } from 'ethers';
import { Provider } from '@ethersproject/providers';

/* Constant */
export const getUnknownString = (
  provider: Provider,
  multiCallAddress: string,
) => {
  return new ethers.Contract(
    multiCallAddress,
    MULTI_CALL_ABI,
    provider,
  ).UNKNOWN_STRING();
};

export const getUnknownUint256 = (
  provider: Provider,
  multiCallAddress: string,
) => {
  return new ethers.Contract(
    multiCallAddress,
    MULTI_CALL_ABI,
    provider,
  ).UNKNOWN_UINT256();
};

export const getUnknownAddress = (
  provider: Provider,
  multiCallAddress: string,
) => {
  return new ethers.Contract(
    multiCallAddress,
    MULTI_CALL_ABI,
    provider,
  ).UNKNOWN_ADDRESS();
};

/* ERC20  */
export const getSafeERC20BalanceOf = async (
  provider: Provider,
  multiCallAddress: string,
  tokenAddress: string,
  userAddress: string,
) => {
  return new ethers.Contract(
    multiCallAddress,
    MULTI_CALL_ABI,
    provider,
  ).safeERC20BalanceOf(tokenAddress, userAddress);
};

export const getBatchERC20TokenBalances = async (
  provider: Provider,
  multiCallAddress: string,
  userAddresses: string[],
  tokenAddresses: string[],
) => {
  return new ethers.Contract(
    multiCallAddress,
    MULTI_CALL_ABI,
    provider,
  ).getBatchERC20Balances(userAddresses, tokenAddresses);
};

export const getERC20TokenInfos = async (
  provider: Provider,
  multiCallAddress: string,
  tokenAddress: string,
) => {
  return new ethers.Contract(
    multiCallAddress,
    MULTI_CALL_ABI,
    provider,
  ).getERC20TokenInfos(tokenAddress);
};

export const getBatchERC20TokenInfos = async (
  provider: Provider,
  multiCallAddress: string,
  tokenAddresses: string[],
) => {
  return new ethers.Contract(
    multiCallAddress,
    MULTI_CALL_ABI,
    provider,
  ).getBatchERC20Infos(tokenAddresses);
};

// TODO: Multi call contract init function
export const getBatchERC20TotalSupply = async (
  provider: Provider,
  multiCallAddress: string,
  addresses: string[],
) => {
  return new ethers.Contract(
    multiCallAddress,
    MULTI_CALL_ABI,
    provider,
  ).getBatchERC20TotalSupply(addresses);
};

/* ERC721  */
export const getERC721TokenInfos = async (
  provider: Provider,
  multiCallAddress: string,
  tokenAddress: string,
  index: number,
) => {
  return new ethers.Contract(
    multiCallAddress,
    MULTI_CALL_ABI,
    provider,
  ).getERC721Infos(tokenAddress, index);
};

export const getBatchERC721TokenInfos = async (
  provider: Provider,
  multiCallAddress: string,
  tokenAddress: string,
  indexes: number[],
) => {
  return new ethers.Contract(
    multiCallAddress,
    MULTI_CALL_ABI,
    provider,
  ).getBatchERC721Infos(tokenAddress, indexes);
};

/* ChainLink */
export const getBatchChainLinkData = async (
  provider: Provider,
  multiCallAddress: string,
  feeds: string[],
) => {
  return new ethers.Contract(
    multiCallAddress,
    MULTI_CALL_ABI,
    provider,
  ).getBatchChainLinkData(feeds);
};

/* Pair */
export const getSafePairInfos = async (
  provider: Provider,
  multiCallAddress: string,
  pair: string,
) => {
  return new ethers.Contract(
    multiCallAddress,
    MULTI_CALL_ABI,
    provider,
  ).safePairInfo(pair);
};

export const getBatchPairInfos = async (
  provider: Provider,
  multiCallAddress: string,
  pairs: string[],
) => {
  return new ethers.Contract(
    multiCallAddress,
    MULTI_CALL_ABI,
    provider,
  ).getBatchPairInfos(pairs);
};

/* Address */
export const getCheckCA = async (
  provider: Provider,
  multiCallAddress: string,
  targetAddress: string,
) => {
  return new ethers.Contract(
    multiCallAddress,
    MULTI_CALL_ABI,
    provider,
  ).checkCA(targetAddress);
};

export const getBatchCheckCA = async (
  provider: Provider,
  multiCallAddress: string,
  targetAddress: string[],
) => {
  return new ethers.Contract(
    multiCallAddress,
    MULTI_CALL_ABI,
    provider,
  ).getBatchCheckCA(targetAddress);
};

/* Aggregator */
export const getBatchStaticAggregator = async (
  provider: Provider,
  multiCallAddress: string,
  calls: any[][],
  requireSuccess: boolean = false,
) => {
  return new ethers.Contract(
    multiCallAddress,
    MULTI_CALL_ABI,
    provider,
  ).staticAggregate(requireSuccess, calls);
};

export const MULTI_CALL_ABI = [
  {
    inputs: [],
    name: 'UNKNOWN_ADDRESS',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'UNKNOWN_STRING',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'UNKNOWN_UINT',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'requireSuccess',
        type: 'bool',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Aggregator.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'aggregate',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'success',
            type: 'bool',
          },
          {
            internalType: 'bytes',
            name: 'returnData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Aggregator.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
    ],
    name: 'checkCA',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_targetFeeds',
        type: 'address[]',
      },
    ],
    name: 'getBatchChainLinkData',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'answer',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'decimals',
            type: 'uint256',
          },
        ],
        internalType: 'struct ChainLink.ChainLinkData[]',
        name: '_chainLinkData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_targetAddress',
        type: 'address[]',
      },
    ],
    name: 'getBatchCheckCA',
    outputs: [
      {
        internalType: 'bool[]',
        name: 'result',
        type: 'bool[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'users',
        type: 'address[]',
      },
      {
        internalType: 'address[]',
        name: 'tokens',
        type: 'address[]',
      },
    ],
    name: 'getBatchERC20Balances',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'addrBalances',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_tokens',
        type: 'address[]',
      },
    ],
    name: 'getBatchERC20Infos',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'decimals',
            type: 'uint256',
          },
        ],
        internalType: 'struct ERC20.ERC20Info[]',
        name: 'tokenInfos',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_tokens',
        type: 'address[]',
      },
    ],
    name: 'getBatchERC20TotalSupply',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'totalSupplies',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: '_indexes',
        type: 'uint256[]',
      },
    ],
    name: 'getBatchERC721Infos',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'tokenURI',
            type: 'string',
          },
        ],
        internalType: 'struct ERC721.ERC721Info[]',
        name: 'erc721Infos',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_targetAddress',
        type: 'address[]',
      },
    ],
    name: 'getBatchGetCode',
    outputs: [
      {
        internalType: 'bytes[]',
        name: 'code',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_pairs',
        type: 'address[]',
      },
    ],
    name: 'getBatchIsPairs',
    outputs: [
      {
        internalType: 'bool[]',
        name: '_isPairs',
        type: 'bool[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_pairs',
        type: 'address[]',
      },
    ],
    name: 'getBatchPairInfos',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'pair',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'token0',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'token1',
            type: 'address',
          },
        ],
        internalType: 'struct Pair.PairInfo[]',
        name: '_pairInfos',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getBlockBaseFee',
    outputs: [
      {
        internalType: 'uint256',
        name: 'baseFee',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
    ],
    name: 'getBlockHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'blockHash',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getChainId',
    outputs: [
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
    ],
    name: 'getCode',
    outputs: [
      {
        internalType: 'bytes',
        name: 'code',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [
      {
        internalType: 'address',
        name: 'coinbase',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [
      {
        internalType: 'uint256',
        name: 'difficulty',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [
      {
        internalType: 'uint256',
        name: 'gaslimit',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [
      {
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
    ],
    name: 'getERC20TokenInfos',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'decimals',
            type: 'uint256',
          },
        ],
        internalType: 'struct ERC20.ERC20Info',
        name: 'tokenInfos',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_index',
        type: 'uint256',
      },
    ],
    name: 'getERC721Infos',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'tokenURI',
            type: 'string',
          },
        ],
        internalType: 'struct ERC721.ERC721Info',
        name: 'erc721Infos',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'blockHash',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pair',
        type: 'address',
      },
    ],
    name: 'isPair',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'feed',
        type: 'address',
      },
    ],
    name: 'safeChainLinkData',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'answer',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'decimals',
            type: 'uint256',
          },
        ],
        internalType: 'struct ChainLink.ChainLinkData',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'holder',
        type: 'address',
      },
    ],
    name: 'safeERC20BalanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'safeERC20Decimals',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'safeERC20Name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'safeERC20Symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'safeERC20TotalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'safeERC721OwnerOf',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'safeERC721TokenByIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
    ],
    name: 'safeERC721TokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pair',
        type: 'address',
      },
    ],
    name: 'safePairInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'pair',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'token0',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'token1',
            type: 'address',
          },
        ],
        internalType: 'struct Pair.PairInfo',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'requireSuccess',
        type: 'bool',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Aggregator.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'staticAggregate',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'success',
            type: 'bool',
          },
          {
            internalType: 'bytes',
            name: 'returnData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Aggregator.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
