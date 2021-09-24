import * as _ from 'lodash';

import { ethers, Contract } from 'ethers';
import { Provider } from '@ethersproject/providers';
import { hexadecimalToNumber } from '@helper/format.helper';

export default class WatcherService {
  contract: Contract;
  watchAbi: any[];
  watchEventArgs = new Map<string, string[]>();
  watchIface: any;

  constructor(provider: Provider, address: string, abi: any) {
    this.contract = new ethers.Contract(address, abi, provider);
    this.watchAbi = this._filterEvent(abi);
    this.watchIface = new ethers.utils.Interface(this.watchAbi);

    abi.forEach((props) => {
      this.watchEventArgs.set(
        props.name,
        props.inputs.map((params) => params.name),
      );
    });
  }

  async watch() {
    this.contract.on('*', async (event) => {
      const { name: eventName, args: eventArgs, contract, timestamp, transactionHash, blockNumber } = await this._parseEvent(event);
      const params = this.watchEventArgs.get(eventName);
      const parseArgs = params.map((param) => eventArgs[param].toString());
      const mapArgs = _.zipObject(params, parseArgs);
      const result = {
        contract,
        name: eventName,
        args: mapArgs,
        timestamp,
        transactionHash,
        blockNumber: hexadecimalToNumber(blockNumber),
      };
      console.log(result);
    });
  }

  private async _parseEvent(event: any) {
    const { timestamp } = await event.getBlock();
    const { name, args } = this.watchIface.parseLog(event);
    return {
      name,
      args,
      contract: event.address,
      timestamp,
      transactionHash: event.transactionHash,
      blockNumber: event.blockNumber,
    };
  }

  private _filterEvent(abi: any) {
    return abi.filter((props) => props.type === 'event');
  }
}
