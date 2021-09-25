import { Inject } from "typedi";
import { SchedulerService } from "../service/scheduler/SchedulerService";

interface IScheduler {
  id: string;
  init(): Promise<void>;
  run(): Promise<void>;
}

export default abstract class SchedulerBase implements IScheduler {

  @Inject() protected readonly schedulerService: SchedulerService;

  // Scheduler id (:uuid)
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  abstract init(): Promise<void>

  abstract run(): Promise<void>

  async getPairChunkSize(): Promise<number> {
    return parseInt(await this.schedulerService.findOneConfigValueByKey('PAIR_CHUNK'), 10)
  }

}