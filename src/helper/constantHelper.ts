import { ethers, BigNumber } from 'ethers';
import { mul, toBigNumber } from './bignumberHelper';

export const ZERO_ADDRESS = ethers.constants.AddressZero;
export const ZERO_HASH = ethers.constants.HashZero;
export const NULL_BYTE = '0x';

export const ZERO = toBigNumber(0);
export const ONE_YEAR_DAYS = toBigNumber(365);
export const ONE_DAY_SECONDS = toBigNumber(86400);
export const ONE_YEAR_SECONDS = toBigNumber(
  mul(ONE_YEAR_DAYS, ONE_DAY_SECONDS),
);

/* MultiCall contract unknown type Label*/
export const UNKNOWN_STRING = 'UNKNOWN';
export const UNKNOWN_UINT256 = BigNumber.from('0');

/* Support protocol */
export enum PROTOCOL {
  UNISWAP = 'UniSwap',
  BAKERY_SWAP = 'BakerySwap',
  AIR_NFT = 'AirNFT',
  APE_SWAP = 'ApeSwap',
  AUTO_FARM = 'AutoFarm',
  BEEFY = 'Beefy',
  BELT_FI = 'BeltFi',
  BI_SWAP = 'BiSwap',
  MDEX = 'Mdex',
  PANCAKE_SWAP = 'PancakeSwap',
  SUSHI_SWAP = 'SushiSwap',
  VENUS = 'Venus',
  WAULT_SWAP = 'WaultSwap',
}

/*  Chain ID */
export enum CHAIN_ID {
  ETH = 1,
  BSC = 56,
  XDAI = 100,
  HECO = 128,
  MATIC = 137,
  FANTOM = 250,
  KLAYTN = 8217,
  AVAX = 43114,
}

/* Log Topic */
export const LOG_METHOD = 'eth_getLogs';
export const CREATE_PAIR_EVENT_TOPIC =
  '0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9';
export const TRANSFER_EVENT_TOPIC =
  '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

/* Promise.allSettled status */
export const SUCCESS = 'fulfilled';
export const FAILED = 'rejected';
