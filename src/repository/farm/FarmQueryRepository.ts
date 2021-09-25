import { createQueryBuilder, EntityRepository } from "typeorm";
import { Farm } from '../../entity/farm/Farm';

@EntityRepository(Farm) 
export class FarmQueryRepository {

  findActivatedAll() {
    return createQueryBuilder()
      .select('farm')
      .from(Farm, 'farm')
      .where('farm.status = :status', { status: true })
      .getMany();
  }

  findActivatedAllByProtocolId(protocolId: number) {
    return createQueryBuilder()
      .select('farm')
      .from(Farm, 'farm')
      .where('farm.status = :status', { status: true })
      .andWhere('farm.protocol_id = :protocolId', { protocolId } )
      .getMany();
  } 

  findActivatedAllByChainId(chainId: number) {
    return createQueryBuilder()
      .select('farm')
      .from(Farm, 'farm')
      .where('farm.status = :status', { status: true })
      .andWhere('farm.network.chain_id = :chainId', { chainId }) 
      .getOne();
  }  

}