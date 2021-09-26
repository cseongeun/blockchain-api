import { createQueryBuilder, EntityRepository } from "typeorm";
import { Token } from '../../entity/token/Token';
import { TokenSearchDTO } from "./dto/TokenSearch";

@EntityRepository(Token) 
export class TokenQueryRepository {

  findOne(dto: TokenSearchDTO): Promise<Token> {
    const queryBuilder = createQueryBuilder()
      .select('token')
      .from(Token, 'token')

    if (dto) {
      if(dto.type) {
        queryBuilder.andWhere("token.type = :type", { type: dto.type })
      }
    
      if(dto.chainId) {
        queryBuilder.innerJoin("token.network", "network", "network.chain_id = :chainId", { chainId: dto.chainId })
      }
  
      if(dto.address) {
        queryBuilder.andWhere("token.address = :address", { address: dto.address })
      }
  
      if(dto.status) {
        queryBuilder.andWhere("token.status = :status", { status: dto.status })
      }
    }

    return queryBuilder
        .disableEscaping()
        .getOne();
  }

  findAllAndCount(dto?: TokenSearchDTO): Promise<[Token[], number]> {
    const queryBuilder = createQueryBuilder()
      .select('token')
      .from(Token, 'token')

    if (dto) {
      if(dto.type) {
        console.log('here')
        queryBuilder.andWhere("token.type = :type", { type: dto.type })
      }
  
      if(dto.types) {
          queryBuilder.andWhere("token.types in (:types)", { types: dto.types })
      }
    
      if(dto.chainId) {
        queryBuilder.innerJoin("token.network", "network", "network.chain_id = :chainId", { chainId: dto.chainId })
      }
  
      if(dto.chainIds) {
          queryBuilder.innerJoin("token.network", "network", "network.chainId in (:chainIds)", { chainIds: dto.chainIds })
      }
  
      if(dto.address) {
          queryBuilder.andWhere("token.address = :address", { address: dto.address })
      }
  
      if(dto.addresses) {
          queryBuilder.andWhere("token.addresses in (:addresses)", { addresses: dto.addresses })
      }
  
      if(dto.status) {
        queryBuilder.andWhere("token.status = :status", { status: dto.status })
      }
    }
    
    return queryBuilder
        .disableEscaping()
        .getManyAndCount();
  }
}