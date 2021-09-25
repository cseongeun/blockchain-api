require('./PancakeSwapBSC');

import { Container } from "typedi";
import { testConnection } from "../../../test/testConnection";
import { PROTOCOL, CHAIN_ID } from "../../helper/constantHelper";
import {Module} from "../ModuleBase";
import { getModuleId } from '../ModuleId'

describe('PancakeSwap.BSC 테스트', () => {
  let service 

  beforeAll(async () => {
    await testConnection.create();     
  });

  afterAll(async () => {
    await testConnection.close();
  });

  beforeEach(async () => {
    service = Container.get<Module>(getModuleId(PROTOCOL.PANCAKE_SWAP, CHAIN_ID.BSC))
    await service.initialize();
  })

  describe('Constant', () => {
    it('all', () => {
      expect(service.farmName()).toBeDefined()
      expect(service.farmAddress()).toBeDefined()
      expect(service.farmDeployHash()).toBeDefined()
      expect(service.farmAbi()).toBeDefined()
      expect(service.farmContract()).toBeDefined()
      expect(service.farm2Name()).toBeDefined()
      expect(service.farm2Address()).toBeDefined()
      expect(service.farm2DeployHash()).toBeDefined()
      expect(service.farm2Abi()).toBeDefined()
      // expect(service.farm2Contract()).toBeDefined() // need argument
      expect(service.ammName()).toBeDefined()
      expect(service.ammAddress()).toBeDefined()
      expect(service.ammDeployHash()).toBeDefined()
      expect(service.ammAbi()).toBeDefined()
      expect(service.ammContract()).toBeDefined()
    })
  })

  describe('Farm', () => {
    describe('getFarmTotalLength()', () => {
      it('is working', async () => {
        const farmTotalLength = await service.getFarmTotalLength();
        console.log(farmTotalLength)
      })
    })
    describe('getFarmInfos()', () => {
      it('is working', async () => {
        const farmInfos = await service.getFarmInfos([1, 2]);
        console.log(farmInfos)
      })
    })
    })
 
  describe('AMM', () => {
    describe('getAMMTotalLength()', () => {
      it('is working', async () => {
        const ammTotalLength = await service.getAMMTotalLength();
        console.log(ammTotalLength)
      })
    })
    describe('getAMMInfos()', () => {
      it('is working', async () => {
        const ammInfos = await service.getAMMInfos([1, 2])
        console.log(ammInfos)
      })
    })
  
  })

})