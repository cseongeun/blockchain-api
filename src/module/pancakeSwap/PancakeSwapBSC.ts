import { Service } from 'typedi';
import { INFO } from './constants';
import ModuleBase from '../ModuleBase';
import FarmBase  from '../FarmBase';
import AMMBase from '../AMMBase';
import { PROTOCOL, CHAIN_ID } from '../../helper/constantHelper';
import { getModuleId } from '../ModuleId';
import { Contract } from '@ethersproject/contracts';
import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';

import { decodeFunctionResultData, encodeFunction } from '../../helper/encodeDecodeHelper';
import { getBatchStaticAggregator } from '../../helper/multicallHelper';

@Service(getModuleId(PROTOCOL.PANCAKE_SWAP, CHAIN_ID.BSC))
export default class PancakeSwapBSC extends AMMBase(FarmBase(ModuleBase)) {
 
  constructor() {
    super(PROTOCOL.PANCAKE_SWAP, CHAIN_ID.BSC, INFO[CHAIN_ID.BSC])
  }

  getUserAMMs(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  getUserFarms(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  // farm
  farmName = (): string => this.constants.farm.name;
  
  farmAddress = (): string => this.constants.farm.address;
  
  farmDeployHash = (): string => this.constants.farm.deployed_hash;
  
  farmAbi = (): any[] => this.addressABI.get(this.farmAddress())

  farmContract = (): Contract => new ethers.Contract(this.farmAddress(), this.farmAbi(), this.provider);

  // farm2
  farm2Name = (): string => this.constants.farm2.name;
  
  farm2Address = (): string => this.constants.farm2.address;
  
  farm2DeployHash = (): string => this.constants.farm2.deployed_hash;
  
  farm2SampleAddress = (): string => this.constants.farm2.sample_address;

  farm2Abi = (): any[] => this.addressABI.get(this.farm2SampleAddress())

  farm2Contract = (address: string): Contract => new ethers.Contract(address, this.farm2Abi(), this.provider);

  // amm
  ammName = (): string => this.constants.amm.name;
  
  ammAddress = (): string => this.constants.amm.address;

  ammDeployHash = (): string => this.constants.amm.deployed_hash;

  ammAbi = (): any[] => this.addressABI.get(this.ammAddress())

  ammContract = (): Contract => new ethers.Contract(this.ammAddress(), this.ammAbi(), this.provider);

  async getFarmTotalLength(): Promise<BigNumber> {
    return this.farmContract().poolLength();
  }

  async getFarmInfos(
    pids: number[]
  ): Promise<{ 
    lpToken: string, 
    allocPoint: BigNumber, 
    lastRewardBlock: BigNumber, 
    accCakePerShare: BigNumber 
  }[]> {
    const farmInfoEncode = pids.map((pid: number) => [this.farmAddress(), encodeFunction(this.farmAbi(), 'poolInfo', [pid])])

    const farmInfoBatchCall = await getBatchStaticAggregator(this.provider, this.multiCallAddress, farmInfoEncode);
    
    return farmInfoBatchCall.map(({ success, returnData }) => {
      return success ? decodeFunctionResultData(this.farmAbi(), 'poolInfo', returnData)[0] : []
    })
  }

  async getAMMTotalLength(): Promise<BigNumber> {
    return this.ammContract().allPairsLength();
  }

  async getAMMInfos(
    pids: number[]
  ): Promise<string[]> {
    const ammInfoEncode = pids.map((pid: number) => [this.ammAddress(), encodeFunction(this.ammAbi(), 'allPairs', [pid])]);
  
    const ammInfoBatchCall = await getBatchStaticAggregator(this.provider, this.multiCallAddress, ammInfoEncode);
  
    return ammInfoBatchCall.map(({ success, returnData }) => {
      return success ? decodeFunctionResultData(this.ammAbi(), 'allPairs', returnData)[0] : [];
    })
  }

  async getAMMComposedPair(pairs: string[]): Promise<{ pair: string, token0: string, token1: string }> {
  }

}




