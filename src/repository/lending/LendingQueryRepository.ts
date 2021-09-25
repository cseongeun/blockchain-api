import { createQueryBuilder, EntityRepository } from "typeorm";
import { Lending } from '../../entity/lending/Lending';

@EntityRepository(Lending) 
export class LendingQueryRepository {

  findActivatedAll() {
    return createQueryBuilder()
      .select('lending')
      .from(Lending, 'lending')
      .where('lending.status = :status', { status: true })
      .getMany();
  }

  findActivatedAllByProtocolId(protocolId: number) {
    return createQueryBuilder()
      .select('lending')
      .from(Lending, 'lending')
      .where('lending.status = :status', { status: true })
      .andWhere('lending.protocol_id = :protocolId', { protocolId } )
      .getMany();
  } 
}