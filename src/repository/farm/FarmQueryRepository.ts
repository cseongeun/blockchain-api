import { createQueryBuilder, EntityRepository } from "typeorm";
import { Farm } from '../../entity/farm/Farm';

@EntityRepository(Farm) 
export class FarmQueryRepository {

  findAll() {
    return createQueryBuilder()
      .select('farm')
      .from(Farm, 'farm')
      .getMany();
  }

  // findOneByChainId(chainId: number) {
  //   return createQueryBuilder()
  //     .select('farm')
  //     .from(farm, 'farm')
  //     .where('network.chain_id = :chainId', { chainId }) 
  //     .getOne();
  // }  

}