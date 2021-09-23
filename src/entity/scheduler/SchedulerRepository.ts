import {EntityRepository, Repository} from "typeorm";
import { Scheduler } from "./Scheduler";
/**
 * CREATE / UPDATE / DELETE
 */
@EntityRepository(Scheduler)
export class SchedulerRepository extends Repository<Scheduler> {}
