import { getCustomRepository } from "typeorm";
import { testConnection } from "../../../test/testConnection";
import { ProtocolQueryRepository } from "./ProtocolQueryRepository";


describe('Protocol 조회 테스트', () => {
    let protocolQueryRepository: ProtocolQueryRepository;

    beforeAll(async () => {
        await testConnection.create();
    });

    afterAll(async () => {
        await testConnection.close();
    });

    beforeEach(async () => {
      protocolQueryRepository = getCustomRepository(ProtocolQueryRepository);
    });
    
    describe('다중 조회',  () => {
      it('findActivatedAll()', async () => { 
        const entities = await protocolQueryRepository.findActivatedAll();
        console.log(entities)
      })
    })

    describe('단일 조회', () => {
      it('findActivatedOneByNameWithChainId()', async () => {
        const entity = await protocolQueryRepository.findActivatedOneByChainIdWithName(56, 'PancakeSwap')
        console.log(entity)
      })
    })

})



