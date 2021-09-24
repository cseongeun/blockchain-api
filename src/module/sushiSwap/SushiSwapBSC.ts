import { Service, Container } from 'typedi';
import { NAME, INFO } from './constants';
import ModuleBase from '../ModuleBase';
import FarmBase  from '../FarmBase';
import AMMBase from '../AMMBase';
import { CHAIN_ID } from '../../helper/constantHelper';

const factory = () => new SushiSwapBSC('sushiSwap', CHAIN_ID.BSC, INFO[CHAIN_ID.BSC])

@Service({ factory })
export default class SushiSwapBSC extends AMMBase(FarmBase(ModuleBase)) {
 
  constructor(name: string, chainId: number, constants: any) {
    super(name, chainId, constants)
  }

  getUserAMMs(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  getUserFarms(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

