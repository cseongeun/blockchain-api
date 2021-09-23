import { createQueryBuilder, EntityRepository } from "typeorm";
import { Network } from '../../entity/network/Network';

@EntityRepository(Network) 
export class NetworkQueryRepository {

  findAll() {
    return createQueryBuilder()
      .select('network')
      .from(Network, 'network')
      .getMany();
  }

  findOneByChainId(chainId: number) {
    return createQueryBuilder()
      .select('network')
      .from(Network, 'network')
      .where('network.chain_id = :chainId', { chainId }) 
      .getOne();
  }  

}