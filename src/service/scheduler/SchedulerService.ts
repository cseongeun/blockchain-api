import { logger } from "ethers";
import { Service } from "typedi";
import { EntityManager, Transaction, TransactionManager } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Scheduler } from "../../entity/scheduler/Scheduler";
import { isUndefined } from "../../helper/typeHelper";
import { SchedulerConfigQueryRepository } from "../../repository/scheduler/SchedulerConfigQueryRepository";
import { SchedulerQueryRepository } from "../../repository/scheduler/SchedulerQueryRepository";

@Service()
export class SchedulerService {
  constructor(
    @InjectRepository() private schedulerQueryRepository: SchedulerQueryRepository,
    @InjectRepository() private schedulerConfigQueryRepository: SchedulerConfigQueryRepository
  ) {}

  checkNotFound(id: string, scheduler: Scheduler): void {
    if (isUndefined(scheduler)) {
      logger.info(`ID: ${id} 찾을 수 없습니다. <SchedulerService>`)
      throw new Error('Not found id');
    }
  }

  // config
  async findOneConfigValueByKey(key: string): Promise<string> {
    const entity = await this.schedulerConfigQueryRepository.findOneByKey(key);
    return entity.value;
  }

  async findAll(): Promise<Scheduler[]> {
    return this.schedulerQueryRepository.findActivatedAll();
  }

  async findOneById(id: string): Promise<Scheduler> {
    return this.schedulerQueryRepository.findActivatedOneById(id);
  }

  async getBlockNumber(id: string): Promise<number> {
    const scheduler = await this.schedulerQueryRepository.findActivatedOneById(id);
    
    this.checkNotFound(id, scheduler)

    return scheduler.block_number;  
  }

  async getPid(id: string): Promise<number> {
    const scheduler = await this.schedulerQueryRepository.findActivatedOneById(id);
    
    this.checkNotFound(id, scheduler)

    return scheduler.pid;  
  }


  @Transaction()
  async updateBlockNumber(
    id: string, 
    blockNumber: number, 
    @TransactionManager() manager?: EntityManager
  ): Promise<void> {
    const scheduler = await this.schedulerQueryRepository.findActivatedOneById(id);

    this.checkNotFound(id, scheduler);

    scheduler.updateBlockNumber(blockNumber);

    await manager.save(scheduler);
  }

  @Transaction()
  async updatePid(
    id: string, 
    pid: number, 
    @TransactionManager() manager?: EntityManager
  ): Promise<void> {
    const scheduler = await this.schedulerQueryRepository.findActivatedOneById(id);
    
    this.checkNotFound(id, scheduler);

    scheduler.updatePid(pid);

    await manager.save(scheduler)
  }

  

}