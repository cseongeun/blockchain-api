import { getCustomRepository } from "typeorm";
import { testConnection } from "../../testConnection";
import { Abi } from "../../../src/entity/abi/Abi";
import { AbiQueryRepository } from "../../../src/repository/abi/AbiQueryRepository";


describe('Abi 조회 테스트', () => {
    let abiQueryRepository: AbiQueryRepository;

    beforeAll(async () => {
        await testConnection.create();
    });

    afterAll(async () => {
        await testConnection.close();
    });

    beforeEach(async () => {
      abiQueryRepository = getCustomRepository(AbiQueryRepository);
    });

    // afterEach(async () => {
    //     await testConnection.clear();
    // });
    
    describe('다중 조화',  () => {
      it('findAll()', async () => { 
        const entities = await abiQueryRepository.findAll();
        console.log(entities)
      })
  
    })

    describe('단일 조회', () => {
      it('findOneByChainIdWithAddress()', async () => {
        const entity = await abiQueryRepository.findOneByChainIdWithAddress(1, '0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd')
        console.log(entity)
      })
    })

})



