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

})