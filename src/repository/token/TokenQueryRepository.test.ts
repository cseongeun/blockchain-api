import { getCustomRepository } from "typeorm";
import { testConnection } from "../../../test/testConnection";
import { TokenQueryRepository } from "./TokenQueryRepository";

describe('Token 조회 테스트', () => {
    let tokenQueryRepository: TokenQueryRepository;

    beforeAll(async () => {
        await testConnection.create();
    });

    afterAll(async () => {
        await testConnection.close();
    });

    beforeEach(async () => {
      tokenQueryRepository = getCustomRepository(TokenQueryRepository);
    });
    
    describe('다중 조회',  () => {
      it('findActivatedAll()', async () => { 
        const entities = await tokenQueryRepository.findActivatedAll();
        console.log(entities)
      })
    })

    describe('단일 조회', () => {
      it('findActivatedOneByChainIdWithAddress()', async () => {
        const entity = await tokenQueryRepository.findActivatedOneByChainIdWithAddress(1, '0x0000000000000000000000000000000000000000')
        console.log(entity)
      })
    })

})



