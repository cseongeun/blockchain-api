import { createQueryBuilder, EntityRepository } from "typeorm";
import { Scheduler } from '../../entity/scheduler/Scheduler';

@EntityRepository(Scheduler) 
export class SchedulerQueryRepository {

  findActivatedAll() {
    return createQueryBuilder()
      .select('scheduler')
      .from(Scheduler, 'scheduler')
      .where('scheduler.status = :status', { status: true } )
      .getMany();
  }

  findActivatedOneById(id: string) {
    return createQueryBuilder()
      .select('scheduler')
      .from(Scheduler, 'scheduler')
      .where('scheduler.status = :status', { status: true } )
      .andWhere('scheduler.id = :id', { id })
      .getOne()
  }

}