import { Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { Network } from '../entity/network/Network';
import { Protocol } from "../entity/protocol/Protocol";
import { NetworkQueryRepository } from '../repository/network/NetworkQueryRepository';
import { ProtocolQueryRepository } from '../repository/protocol/ProtocolQueryRepository';
import octetConfig from '../config/octet'
import { randomPick } from '../helper/arrayHelper';
import { AbiQueryRepository } from '../repository/abi/AbiQueryRepository';
import { isUndefined } from '../helper/typeHelper';
import { Abi } from '../entity/abi/Abi';
import { InjectRepository } from 'typeorm-typedi-extensions';

export interface IModule {
  provider: Provider;
  blockTimeSecond: number;
  getBlockNumber(): Promise<number>
  initialize(): void;
}

export default class ModuleBase implements IModule {

  @InjectRepository() private readonly networkQueryRepository: NetworkQueryRepository;
  @InjectRepository() private readonly protocolQueryRepository: ProtocolQueryRepository;
  @InjectRepository() private readonly abiQueryRepository: AbiQueryRepository;

  // TODO: Use position store ex) nft, farm 
  public use: any

  public network: Network;
  public protocol: Protocol;
  public providers: Provider[];

  // Search ABI by address
  public addressABI = new Map<string, any>();
    
  constructor(
    // module name, this will be module's identity (with chainId)
    public name: string,

    // module chainId, this will be module's identity (with name)
    public chainId: number, 

    // module constants, each module folder's constant file
    public constants: { [key: string]: any },
  ) {}

  async initialize(): Promise<void> {
    this.network = await this.networkQueryRepository.findActivatedOneByChainId(this.chainId);
    this.protocol = await this.protocolQueryRepository.findActivatedOneByChainIdWithName(this.chainId, this.name);
    
    if (isUndefined(this.network) || isUndefined(this.protocol)) {
      throw new Error('Not found module base property')
    }

    this.providers = this._generateHTTPProvider(this.network.getHTTPConfig())

    // inject needed address(looking each module constants) abi, search in 'abi table' 
    await this._injectABI();
  }

  get provider(): Provider {
    return this.providers.length > 0 ? randomPick(this.providers) : null
  }

  get blockTimeSecond(): number {
    return this.network.block_time_sec;
  }

  get multiCallAddress(): string {
    return this.network.multi_call_address;
  }

  get useFarm(): boolean {
    return this.protocol.use_farm
  }

  get useLending(): boolean {
    return this.protocol.use_lending
  }

  get useAmm(): boolean {
    return this.protocol.use_amm
  }

  get useNFT(): boolean {
    return this.protocol.use_nft
  }

  async getBlockNumber(): Promise<number> {
    return this.provider.getBlockNumber();
  }

  _generateHTTPProvider(httpConfig: any): Provider[] {
    try {
      const providers: Provider[] = [];

      for (const { type, url } of JSON.parse(httpConfig)) {
        let provider: Provider;
        if (type === 'OCTET') {
          provider = new ethers.providers.JsonRpcProvider({ url, ...octetConfig })
        } else {
          provider = new ethers.providers.JsonRpcProvider({ url })
        } 

        // TODO: check health provider 

        providers.push(provider)
      }
      
      if (providers.length < 0) {
        throw new Error(`Not found http provider config, <module.chainId: ${this.chainId}>`)
      }

      return providers;
    } catch (e) {
      throw new Error(`Failed to generate http provider, <module.name: ${this.name}, module.chainId: ${this.chainId}>`);
    }
  }

  async _checkHealth(provider: Provider) {
    try {
      await provider.getBlockNumber();
      return true;
    } catch (e) {
      return false;
    }
  }

  async _injectABI(): Promise<void> {
    for await (const { name, address, sample_address } of Object.values(this.constants)) {
      try {
        const findABIAddress = [];

        if (!isUndefined(address)) {
          findABIAddress.push(address)
        } 

        if (!isUndefined(sample_address)) {
          findABIAddress.push(sample_address)
        }

        const abiEntity = await this.abiQueryRepository.findAllByChainIdWithAddresses(this.chainId, findABIAddress);

        abiEntity.forEach((entity: Abi) => {
          this.addressABI.set(entity.address, entity.getABI());
        })
      } catch (e) {
        throw new Error(`Failed to inject abi, <module.name: ${this.name}, module.chainId: ${this.chainId}, part: ${name}>`)
      }
    }
  }
}
