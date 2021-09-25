import { Constructor } from '../helper/mixInHelper'
import { BigNumber } from '@ethersproject/bignumber';
import { getBatchPairInfos } from '../helper/multicallHelper';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Base<T extends Constructor>(C: T) {
  
  abstract class Base extends C {

    constructor(...args: any[]) {
      super(...args)
    }



    // find user liquidity position
    abstract getUserAMMs(): Promise<any>

    abstract getAMMTotalLength(): Promise<BigNumber>
    abstract getAMMInfos(pids: number[]): Promise<string[]>
    abstract getAMMComposedPairs(pairs: string[]): Promise<{ pair: string, token0: string, token1: string }>
  }
  return Base;
}



