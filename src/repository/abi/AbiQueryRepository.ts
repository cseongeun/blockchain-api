import { createQueryBuilder, EntityRepository } from "typeorm";
import { Abi } from '../../entity/abi/Abi';

@EntityRepository(Abi) 
export class AbiQueryRepository {

  findAll() {
    return createQueryBuilder()
      .select('abi')
      .from(Abi, 'abi')
      .getMany();
  }

  findOneByChainIdWithAddress(chainId: number, address: string) {
    return createQueryBuilder()
      .select('abi')
      .from(Abi, 'abi')
      .innerJoin('abi.network', 'network', 'network.chain_id = :chainId', { chainId })
      .where('abi.address = :address', { address })
      .getRawOne();
  }  

}