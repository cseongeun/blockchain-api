/* eslint-disable @typescript-eslint/no-unused-vars */
import { getCustomRepository } from "typeorm";
import { testConnection } from "../../testConnection";
import { NetworkQueryRepository} from "../../../src/repository/network/NetworkQueryRepository";

describe('Network 조회 테스트', () => {
    let networkQueryRepository: NetworkQueryRepository;

    beforeAll(async () => {
        await testConnection.create();
    });
    it('aa', async () => {
      console.log('1')
    })

    // afterAll(async () => {
    //     await testConnection.close();
    // });

    // beforeEach(async () => {
    //   networkQueryRepository = getCustomRepository(NetworkQueryRepository);
    // });

    // afterEach(async () => {
    //     // await testConnection.clear();
    // });
    
    // it('다중 조회', async () => { 
    //   const entities = await networkQueryRepository.findAll();
    // })

    // describe('단일 조회', () => {
    //   it('체인 넘버', async () => {
    //     const entity = await networkQueryRepository.findOneByChainId(1)
    //   })
    // })

})
