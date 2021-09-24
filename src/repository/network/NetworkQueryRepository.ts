import { createQueryBuilder, EntityRepository } from "typeorm";
import { Network } from '../../entity/network/Network';

@EntityRepository(Network) 
export class NetworkQueryRepository {

  findActivatedAll() {
    return createQueryBuilder()
      .select('network')
      .from(Network, 'network')
      .where('network.status = :status', { status: true } )
      .getMany();
  }

  findActivatedOneByChainId(chainId: number) {
    return createQueryBuilder()
      .select('network')
      .from(Network, 'network')
      .where('network.chain_id = :chainId', { chainId }) 
      .andWhere('network.status = :status', { status: true } )
      .getOne();
  }  
}