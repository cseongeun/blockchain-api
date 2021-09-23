import { getCustomRepository } from "typeorm";
import { testConnection } from "../../testConnection";
import { Abi } from "../../../src/entity/abi/Abi";
import { AbiRepository} from "../../../src/entity/abi/AbiRepository";
import { AbiQueryRepository } from "../../../src/repository/abi/AbiQueryRepository";


describe('Abi 조회 테스트', () => {
    let abiRepository: AbiRepository;
    let abiQueryRepository: AbiQueryRepository;

    beforeAll(async () => {
        await testConnection.create();
    });

    afterAll(async () => {
        await testConnection.close();
    });

    beforeEach(async () => {
      abiRepository = getCustomRepository(AbiRepository);
      abiQueryRepository = getCustomRepository(AbiQueryRepository);
    });

    // afterEach(async () => {
    //     await testConnection.clear();
    // });
    
    it('', () => { 
      return
    })

})



