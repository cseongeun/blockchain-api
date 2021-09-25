import { createQueryBuilder, EntityRepository } from "typeorm";
import { SchedulerConfig } from "../../entity/scheduler/SchedulerConfig";

@EntityRepository(SchedulerConfig) 
export class SchedulerConfigQueryRepository {

  findAll() {
    return createQueryBuilder()
      .select('scheduler_config')
      .from(SchedulerConfig, 'scheduler_config')
      .getMany();
  }

  findOneByKey(key: string) {
    return createQueryBuilder()
      .select('scheduler_config')
      .from(SchedulerConfig, 'scheduler_config')
      .where('scheduler_config.key = :key', { key } )
      .getOne()
  }

}