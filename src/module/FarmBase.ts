import { InjectRepository } from 'typeorm-typedi-extensions';
import { Farm } from '../entity/farm/Farm';
import { Protocol } from '../entity/protocol/Protocol';
import { Constructor } from '../helper/mixInHelper'
import { FarmQueryRepository } from '../repository/farm/FarmQueryRepository';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Base<T extends Constructor>(C: T) {
    
    abstract class Base extends C {
      
      // will be fill mixed in module base (모듈 베이스와 믹싱되면 값이 채워짐, 선언만 진행)
      protocol: Protocol
      
      @InjectRepository() private readonly farmQueryRepository: FarmQueryRepository;

      constructor(...args: any[]) {
        super(...args)
      }

      async getFarms(): Promise<Farm[]> {
        return this.farmQueryRepository.findAllByProtocolId(this.protocol.id)
      }

      // find user deposit farms
      abstract getUserFarms(): Promise<any>
    }
    return Base;
}



