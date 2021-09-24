import { createQueryBuilder, EntityRepository } from "typeorm";
import { Protocol } from '../../entity/protocol/Protocol';

@EntityRepository(Protocol) 
export class ProtocolQueryRepository {

  findActivatedAll() {
    return createQueryBuilder()
      .select('protocol')
      .from(Protocol, 'protocol')
      .where('protocol.status = :status', { status: true } )
      .getMany();
  }

  findActivatedOneByChainIdWithName(chainId: number, name: string) {
    return createQueryBuilder()
      .select('protocol')
      .from(Protocol, 'protocol')
      .innerJoin('protocol.network', 'network', 'network.chain_id = :chainId', { chainId })
      .where('protocol.name = :name', { name })
      .getOne();
  }  
}