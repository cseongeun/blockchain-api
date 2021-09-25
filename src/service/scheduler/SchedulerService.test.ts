import { getCustomRepository } from "typeorm";
import { testConnection } from "../../../test/testConnection";
import { SchedulerQueryRepository } from "../../repository/scheduler/SchedulerQueryRepository";
import { SchedulerService } from "./SchedulerService";

describe('Scheduler 서비스 테스트', () => {
    let schedulerQueryRepository: SchedulerQueryRepository;
    let schedulerService: SchedulerService;

    beforeAll(async () => {
        await testConnection.create();
    });

    afterAll(async () => {
        await testConnection.close();
    });

    beforeEach(async () => {
      schedulerQueryRepository = getCustomRepository(SchedulerQueryRepository);
      schedulerService = new SchedulerService(schedulerQueryRepository);
    })

    describe('다중 조회',  () => {
      describe('findAll()', () => {
        it('is working', async () => { 
          const entities = await schedulerService.findAll();
          console.log(entities)
        })
      })
    })

    describe('단일 조회', () => {
      describe('findOneById()', () => {
        it('is working', async () => {
          const entity = await schedulerService.findOneById('0d3d5f2e-f9af-11eb-8699-4d58d31a07d6')
          console.log(entity)
        })
      })
    })

    describe('단일 필드 조회', () => {
      describe('getBlockNumber()', () => {
        it('is working', async () => {
          const blockNumber = await schedulerService.getBlockNumber('0d3d5f2e-f9af-11eb-8699-4d58d31a07d6')
          console.log(blockNumber)
        })
      })
      describe('getPid()', () => {
        it('is working', async () => {
          const pid = await schedulerService.getPid('0d3d5f2e-f9af-11eb-8699-4d58d31a07d6')
          console.log(pid)
        })
      })
    })

})



