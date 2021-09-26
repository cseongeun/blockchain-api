// import Scheduler from '@scheduler/scheduler';
// import { sequelize } from '@model/index';
// import { Op } from 'sequelize';
// import { SchedulerRepository, STATUS, TokenType } from '@repository/index';
// import { sub, add, isGreaterThan, isGreaterThanOrEqual } from '@helper/bignumber.helper';
// import { isNull } from '@helper/type.helper';
// import { fillSequenceNumber, removeStringValues } from '@helper/array.helper';
// import { getBatchCheckCA, getBatchERC20TokenInfos, getBatchPairInfos, getERC20TokenInfos, getSafePairInfos } from '@service/multiCall.service';
// import { SUCCESS, UNKNOWN_STRING, UNKNOWN_UINT256, ZERO_ADDRESS } from '@helper/constant.helper';
// import { isZeroAddress } from '@helper/address.helper';

import { BigNumber } from '@ethersproject/bignumber';
import logger from '../../config/lib/logger';
import { Inject } from 'typedi';
import { fillSequenceNumber } from '../../helper/arrayHelper';
import { add, isGreaterThan, isGreaterThanOrEqual, sub } from '../../helper/bignumberHelper';
import { isNull } from '../../helper/typeHelper';
import PancakeSwapBSC from '../../module/pancakeSwap/PancakeSwapBSC';
import SchedulerBase from '../SchedulerBase';
import { getBatchPairInfos } from '../../helper/multicallHelper';
import { TokenService } from '../../service/token/tokenService';

export default class PancakeSwapBSCPair extends SchedulerBase {
  
  @Inject() private readonly context: PancakeSwapBSC;
  @Inject() private readonly tokenService: TokenService;
  
  constructor(id: string) {
    super(id);
  }

  async init() {
    return
  }

  async networkPid(): Promise<BigNumber> {
    return this.context.getAMMTotalLength();
  }

  async schedulerPid(): Promise<number> {
    return this.schedulerService.getPid(this.id) || 0;
  }

  grouping(pairInfos: any[]): { uniqueMultiTokenAddresses: string[], uniqueSingleTokenAddresses: string[] } {
    const multi = [];
    const single = [];

    pairInfos.forEach(({ pair, token0, token1 }) => {
      multi.push(pair);
      single.push(token0);
      single.push(token1);
    });

    return { uniqueMultiTokenAddresses: [...new Set(multi)], uniqueSingleTokenAddresses: [...new Set(single)] };
  }

  async removeRegisteredTokens(multiTokenAddresses: string[], singleTokenAddresses: string[], transaction: any) {
    const [registeredMultiTokens, registeredSingleTokens] = await Promise.all([
      this.tokenService.findAll(
        {
          chainId: this.context.chainId,
          addresses: multiTokenAddresses,
        },
      ),
      // Scheduler.getRegisteredTokens(
      //   {
      //     network_id: this.context.protocol.Network.id,
      //     address: { [Op.in]: singleTokenAddresses },
      //   },
      //   transaction,
      // ),
    ]);

    // const [registeredMultiTokenAddresses, registeredSingleTokenAddresses] = [
    //   registeredMultiTokens.map(({ address }) => address),
    //   registeredSingleTokens.map(({ address }) => address),
    // ];

    // const [notRegisteredMultiTokenAddresses, notRegisteredSingleTokenAddresses] = [
    //   removeStringValues(multiTokenAddresses, registeredMultiTokenAddresses, true),
    //   removeStringValues(singleTokenAddresses, registeredSingleTokenAddresses, true),
    // ];

    // return {
    //   notRegisteredMultiTokenAddresses,
    //   notRegisteredSingleTokenAddresses,
    // };
  }
  

  async doTask(sPid: number, ePid: number): Promise<void> {
    const pids = fillSequenceNumber(parseInt(sub(ePid, sPid).toString(), 10), sPid);
    const pairs = await this.context.getAMMInfos(pids);

    // { pair: string, token0: string, token1: string }
    const pairsComposed = await getBatchPairInfos(this.context.provider, this.context.multiCallAddress, pairs);
    const { uniqueMultiTokenAddresses, uniqueSingleTokenAddresses } = this.grouping(pairsComposed);

   

  
  }

  async run(): Promise<void> {
    try {
      const [networkPid, schedulerPid] = await Promise.all([this.networkPid(), this.schedulerPid()])

      const sPid: any = parseInt(schedulerPid.toString(), 10);
      let ePid: any = parseInt(networkPid.toString(), 10);

      if (isGreaterThanOrEqual(sPid, ePid)) return;

      const chunkSize = await this.getPairChunkSize();

      if (isGreaterThan(sub(ePid, sPid), chunkSize)) {
        ePid = add(sPid, chunkSize);
      }
      
      await this.doTask(sPid, ePid);
    } catch (e) {
      logger.error(`ID: ${this.id} run error, ERROR: ${JSON.stringify(e)}`)
      throw new Error(e);
    }
  }
// async crawlPair() {
  //   let transaction = null;

  //   try {
  //     const { networkPid, schedulerPid } = await this.getPairPidState();

  //     let start: any = parseInt(schedulerPid, 10);
  //     let end: any = parseInt(networkPid, 10);

  //     if (isGreaterThanOrEqual(start, end)) return;
  //     if (isGreaterThan(sub(end, start), this.pairPidChunkSize)) {
  //       end = add(start, this.pairPidChunkSize);
  //     }

  //     const pids = fillSequenceNumber(parseInt(sub(end, start).toString(), 10), start);
  //     const pairs = await this.context.getMultiFactoryAllPairs(pids);
  //     this.debug(` <total pair: ${networkPid.toString()}, process: ${start.toString()} ~ ${end.toString()}>`);

  //     transaction = await sequelize.transaction();
  //     await this.registrationRun(pairs, transaction);
  //     await this.updateLatestPid(end, transaction);
  //     await transaction.commit();
  //   } catch (e) {
  //     console.log(e);
  //     if (!isNull(transaction)) await transaction.rollback();
  //     throw new Error(e);
  //   }
  // }


  // async init() {
  //   await this.context.init();
  // }

  // async getNetworkPid() {
  //   return this.context.getFactoryAllPairsLength();
  // }

  // async getSchedulerPid() {
  //   const { pid: schedulerPid } = await SchedulerRepository.findOne({ uuid: this.target });
  //   return schedulerPid || 0;
  // }

  // async getPairPidState() {
  //   const [networkPid, schedulerPid] = await Promise.all([this.getNetworkPid(), this.getSchedulerPid()]);
  //   return { networkPid, schedulerPid };
  // }

  // async updateLatestPid(pid: string, transaction: any = null) {
  //   return SchedulerRepository.update({ uuid: this.target }, { pid }, { transaction });
  // }

  // groupingTokens(composedTokenInfos: any) {
  //   const multi = [];
  //   const single = [];

  //   composedTokenInfos.forEach(({ pair, token0, token1 }) => {
  //     multi.push(pair);
  //     single.push(token0);
  //     single.push(token1);
  //   });
  //   return { uniqueMultiTokenAddresses: [...new Set(multi)], uniqueSingleTokenAddresses: [...new Set(single)] };
  // }

  // async removeRegisteredTokens(multiTokenAddresses: string[], singleTokenAddresses: string[], transaction: any) {
  //   const [registeredMultiTokens, registeredSingleTokens] = await Promise.all([
  //     Scheduler.getRegisteredTokens(
  //       {
  //         network_id: this.context.protocol.Network.id,
  //         address: { [Op.in]: multiTokenAddresses },
  //       },
  //       transaction,
  //     ),
  //     Scheduler.getRegisteredTokens(
  //       {
  //         network_id: this.context.protocol.Network.id,
  //         address: { [Op.in]: singleTokenAddresses },
  //       },
  //       transaction,
  //     ),
  //   ]);

  //   const [registeredMultiTokenAddresses, registeredSingleTokenAddresses] = [
  //     registeredMultiTokens.map(({ address }) => address),
  //     registeredSingleTokens.map(({ address }) => address),
  //   ];

  //   const [notRegisteredMultiTokenAddresses, notRegisteredSingleTokenAddresses] = [
  //     removeStringValues(multiTokenAddresses, registeredMultiTokenAddresses, true),
  //     removeStringValues(singleTokenAddresses, registeredSingleTokenAddresses, true),
  //   ];

  //   return {
  //     notRegisteredMultiTokenAddresses,
  //     notRegisteredSingleTokenAddresses,
  //   };
  // }

  // async removeInvalidTokens(multiTokenAddresses: string[], singleTokenAddresses: string[]) {
  //   // remove same multi token in single position
  //   singleTokenAddresses = removeStringValues(singleTokenAddresses, multiTokenAddresses, true);

  //   const singleTokenCheckCA = await getBatchCheckCA(this.context.provider, this.context.multiCallAddress, singleTokenAddresses);

  //   const invalidSingleTokenAddresses = [];
  //   const validSingleTokenAddresses = singleTokenAddresses.filter((address, index) => {
  //     if (!singleTokenCheckCA[index]) {
  //       invalidSingleTokenAddresses.push(address);
  //     }
  //     return singleTokenCheckCA[index];
  //   });

  //   return {
  //     validMultiTokenAddresses: multiTokenAddresses,
  //     validSingleTokenAddresses,
  //     invalidSingleTokenAddresses,
  //   };
  // }

  // async removeAndCreateMultiTokenInSinglePosition(
  //   multiTokenAddresses: string[],
  //   singleTokenAddresses: string[],
  //   invalidSingleTokenAddresses: string[],
  //   transaction: any,
  // ) {
  //   // check is pair token
  //   let checkMultiInfos;
  //   try {
  //     checkMultiInfos = await getBatchPairInfos(this.context.provider, this.context.multiCallAddress, singleTokenAddresses);
  //   } catch (e) {
  //     checkMultiInfos = await Promise.all(
  //       singleTokenAddresses.map(async (address) => {
  //         try {
  //           return getSafePairInfos(this.context.provider, this.context.multiCallAddress, address);
  //         } catch (e) {
  //           return { pair: address, token0: ZERO_ADDRESS, token1: ZERO_ADDRESS, weird: true };
  //         }
  //       }),
  //     );
  //   }

  //   const pureSingleTokenAddresses = [];
  //   const toRegistrationPairs = [];
  //   await Promise.all(
  //     checkMultiInfos.map(async (infos) => {
  //       const { pair, token0, token1, weird } = infos;

  //       // if weird token
  //       if (weird) {
  //         invalidSingleTokenAddresses.push(pair);
  //       }
  //       // if pure single token
  //       else if (isZeroAddress(token0) && isZeroAddress(token1)) {
  //         pureSingleTokenAddresses.push(pair);
  //       }
  //       // if multi token
  //       else {
  //         toRegistrationPairs.push(pair);
  //       }
  //     }),
  //   );

  //   if (toRegistrationPairs.length > 0) {
  //     await this.registrationRun(toRegistrationPairs, transaction);
  //   }

  //   return {
  //     pureMultiTokenAddresses: multiTokenAddresses,
  //     pureSingleTokenAddresses,
  //     pureInvalidSingleTokenAddresses: invalidSingleTokenAddresses,
  //   };
  // }

  // async createSingleTokens(singleTokenAddresses: string[], singleTokenInfos: any[], transaction: any): Promise<void> {
  //   const singleTokenBulkParams = singleTokenAddresses.map((address, index) => {
  //     const { name, symbol, decimals } = singleTokenInfos[index];
  //     return {
  //       network_id: this.context.protocol.Network.id,
  //       type: TokenType.SINGLE,
  //       address,
  //       name,
  //       symbol,
  //       decimals: decimals.toString(),
  //       status: name === UNKNOWN_STRING || symbol === UNKNOWN_STRING ? STATUS.DEACTIVATE : STATUS.ACTIVATE,
  //     };
  //   });
  //   await Scheduler.registerBulkToken(singleTokenBulkParams, transaction);
  // }

  // async createMultiTokens(
  //   multiTokenAddresses: string[],
  //   multiTokenInfos: any[],
  //   composedTokenInfos: any[],
  //   invalidSingleTokenAddresses: string[],
  //   transaction,
  // ): Promise<void> {
  //   const multiTokenBulkParams = [];
  //   await Promise.all(
  //     multiTokenAddresses.map(async (address, index) => {
  //       const { name, symbol, decimals } = multiTokenInfos[index];
  //       const { token0, token1 } = composedTokenInfos.find((infos: any) => infos.pair.toLowerCase() === address.toLowerCase());

  //       const hasInvalidSingle = invalidSingleTokenAddresses.some((address) => address === token0 || address === token1);
  //       if (hasInvalidSingle) return;

  //       const [registeredToken0, registeredToken1] = await Promise.all([
  //         Scheduler.getRegisteredToken({ network_id: this.context.protocol.Network.id, address: token0 }, transaction),
  //         Scheduler.getRegisteredToken({ network_id: this.context.protocol.Network.id, address: token1 }, transaction),
  //       ]);

  //       if (registeredToken0.status !== STATUS.DEACTIVATE && registeredToken1.status !== STATUS.DEACTIVATE) {
  //         multiTokenBulkParams.push({
  //           network_id: this.context.protocol.Network.id,
  //           type: TokenType.MULTI,
  //           address,
  //           name,
  //           symbol: `${registeredToken0.symbol}-${registeredToken1.symbol}`,
  //           decimals,
  //           pair0_token_id: registeredToken0.id,
  //           pair1_token_id: registeredToken1.id,
  //           status: name === UNKNOWN_STRING || symbol === UNKNOWN_STRING ? STATUS.DEACTIVATE : STATUS.ACTIVATE,
  //         });
  //       }
  //     }),
  //   );

  //   await Scheduler.registerBulkToken(multiTokenBulkParams, transaction);
  // }

  // async registrationRun(pairs: string[], transaction: any): Promise<void> {
  //   const composedTokenInfos = await this.context.getMultiExtractPairTokens(pairs);

  //   // check each unique
  //   const { uniqueMultiTokenAddresses, uniqueSingleTokenAddresses } = this.groupingTokens(composedTokenInfos);

  //   // check each registered
  //   const { notRegisteredMultiTokenAddresses, notRegisteredSingleTokenAddresses } = await this.removeRegisteredTokens(
  //     uniqueMultiTokenAddresses,
  //     uniqueSingleTokenAddresses,
  //     transaction,
  //   );

  //   // check each valid
  //   const { validMultiTokenAddresses, validSingleTokenAddresses, invalidSingleTokenAddresses } = await this.removeInvalidTokens(
  //     notRegisteredMultiTokenAddresses,
  //     notRegisteredSingleTokenAddresses,
  //   );

  //   // check each pure tokens
  //   const { pureMultiTokenAddresses, pureSingleTokenAddresses, pureInvalidSingleTokenAddresses } =
  //     await this.removeAndCreateMultiTokenInSinglePosition(
  //       validMultiTokenAddresses,
  //       validSingleTokenAddresses,
  //       invalidSingleTokenAddresses,
  //       transaction,
  //     );

  //   // get token infos: try, catch (for weird token)
  //   let multiTokenInfos = [];
  //   let singleTokenInfos = [];
  //   try {
  //     multiTokenInfos = await getBatchERC20TokenInfos(this.context.provider, this.context.multiCallAddress, pureMultiTokenAddresses);
  //   } catch (e) {
  //     const callResult = await Promise.allSettled(
  //       pureMultiTokenAddresses.map(async (multiTokenAddress) => {
  //         return getERC20TokenInfos(this.context.provider, this.context.multiCallAddress, multiTokenAddress);
  //       }),
  //     );
  //     multiTokenInfos = callResult.map((result) =>
  //       result.status === SUCCESS ? result.value : { name: UNKNOWN_STRING, symbol: UNKNOWN_STRING, decimals: UNKNOWN_UINT256 },
  //     );
  //   }

  //   try {
  //     singleTokenInfos = await getBatchERC20TokenInfos(this.context.provider, this.context.multiCallAddress, pureSingleTokenAddresses);
  //   } catch (e) {
  //     const callResult = await Promise.allSettled(
  //       pureSingleTokenAddresses.map(async (singleTokenAddress) => {
  //         return getERC20TokenInfos(this.context.provider, this.context.multiCallAddress, singleTokenAddress);
  //       }),
  //     );
  //     singleTokenInfos = callResult.map((result) =>
  //       result.status === SUCCESS ? result.value : { name: UNKNOWN_STRING, symbol: UNKNOWN_STRING, decimals: UNKNOWN_UINT256 },
  //     );
  //   }

  //   if (pureSingleTokenAddresses.length > 0) {
  //     await this.createSingleTokens(pureSingleTokenAddresses, singleTokenInfos, transaction);
  //   }

  //   if (pureMultiTokenAddresses.length > 0) {
  //     await this.createMultiTokens(pureMultiTokenAddresses, multiTokenInfos, composedTokenInfos, pureInvalidSingleTokenAddresses, transaction);
  //   }
  // }

  // async crawlPair() {
  //   let transaction = null;

  //   try {
  //     const { networkPid, schedulerPid } = await this.getPairPidState();

  //     let start: any = parseInt(schedulerPid, 10);
  //     let end: any = parseInt(networkPid, 10);

  //     if (isGreaterThanOrEqual(start, end)) return;
  //     if (isGreaterThan(sub(end, start), this.pairPidChunkSize)) {
  //       end = add(start, this.pairPidChunkSize);
  //     }

  //     const pids = fillSequenceNumber(parseInt(sub(end, start).toString(), 10), start);
  //     const pairs = await this.context.getMultiFactoryAllPairs(pids);
  //     this.debug(` <total pair: ${networkPid.toString()}, process: ${start.toString()} ~ ${end.toString()}>`);

  //     transaction = await sequelize.transaction();
  //     await this.registrationRun(pairs, transaction);
  //     await this.updateLatestPid(end, transaction);
  //     await transaction.commit();
  //   } catch (e) {
  //     console.log(e);
  //     if (!isNull(transaction)) await transaction.rollback();
  //     throw new Error(e);
  //   }
  // }

  // async run() {
  //   return this.crawlPair();
  // }
}
