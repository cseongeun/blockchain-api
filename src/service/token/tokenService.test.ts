import { getCustomRepository } from "typeorm";
import { testConnection } from "../../../test/testConnection";
import { TokenQueryRepository } from "../../repository/token/TokenQueryRepository";
import { TokenService } from "./TokenService";

describe('Token 서비스 테스트', () => {
    let tokenQueryRepository: TokenQueryRepository;
    let tokenService: TokenService;

    beforeAll(async () => {
        await testConnection.create();
    });

    afterAll(async () => {
        await testConnection.close();
    });

    beforeEach(async () => {
      tokenQueryRepository = getCustomRepository(TokenQueryRepository);
      tokenService = new TokenService(tokenQueryRepository);
    })

    describe('다중 조회',  () => {
      describe('findAll(), each ', () => {
        it('is working', async () => { 
          const entities = await tokenService.findAll();
          console.log(entities)
        })
        it('query (type)', async () => {
          const entities = await tokenService.findAll({ type: 'SINGLE' })
          console.log(entities)
        })
        it('query (types)', async () => {
          const entities = await tokenService.findAll({ types: ['SINGLE', 'MULTI'] })
          console.log(entities)
        })
        it('query (status)', async () => {
          const entities = await tokenService.findAll({ status: false });
          console.log(entities)
        })
        it('query (chainId)', async () => {
          const entities = await tokenService.findAll({ chainId: 56 })
          console.log(entities)
        })
        it('query (chainIds)', async () => {
          const entities = await tokenService.findAll({ chainIds: [1, 56] })
          console.log(entities)
        })
        it('query (addresses)', async () => {
          const entities = await tokenService.findAll({ addresses: [
            "0xb59490aB09A0f526Cc7305822aC65f2Ab12f9723",
            "0x762539b45A1dCcE3D36d080F74d1AED37844b878",
            "0x52CE071Bd9b1C4B00A0b92D298c512478CaD67e8",
            "0x8519EA49c997f50cefFa444d240fB655e89248Aa"
          ]})
          console.log(entities)
        })
      })
      describe('findAll(), multi', () => {
        it('query (type, chainId)', async () => {
          const entities = await tokenService.findAll({ type: 'NATIVE', chainId: 1 });
          console.log(entities)
        })
        it('query (chainId, address)', async () => {
          const entities = await tokenService.findAll({ chainId: 1, address: '0x8519EA49c997f50cefFa444d240fB655e89248Aa' })
          console.log(entities)
        })
      })
    })
})



