/* eslint-disable @typescript-eslint/no-unused-vars */
import { getCustomRepository } from "typeorm";
import { testConnection } from "../../../test/testConnection";
import { NetworkQueryRepository} from './NetworkQueryRepository'

describe('Network 조회 테스트', () => {
    let networkQueryRepository: NetworkQueryRepository;

    beforeAll(async () => {
      await testConnection.create();
    });

    afterAll(async () => {
      await testConnection.close();
    });

    beforeEach(async () => {
      networkQueryRepository = getCustomRepository(NetworkQueryRepository);
    });

    describe('다중 조회', () => {
      it('findActivatedAll()', async () => {
        const entities = await networkQueryRepository.findActivatedAll();
        console.log(entities)
      })
    })

    describe('단일 조회', () => {
      it('findActivatedOneByChainId()', async () => {
        const entity = await networkQueryRepository.findActivatedOneByChainId(123123);
        console.log(entity)
      })
    })
})
