import { createQueryBuilder, EntityRepository } from "typeorm";
import { Token } from '../../entity/token/Token';

@EntityRepository(Token) 
export class TokenQueryRepository {

  findActivatedAll() {
    return createQueryBuilder()
      .select('token')
      .from(Token, 'token')
      .where('token.status = :status', { status: true } )
      .getMany();
  }

  findActivatedOneByChainIdWithAddress(chainId: number, address: string) {
    return createQueryBuilder()
      .select('token')
      .from(Token, 'token')
      .innerJoin('token.network', 'network', 'network.chain_id = :chainId', { chainId })
      .where('token.address = :address', { address })
      .getOne();
  }
}