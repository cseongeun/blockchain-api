/* eslint-disable @typescript-eslint/no-var-requires */

import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Network } from "../../src/entity/network/Network";
import { Token } from "../../src/entity/token/Token";
import { Protocol } from "../../src/entity/protocol/Protocol";
import { Abi } from "../../src/entity/abi/Abi";
import { Scheduler } from "../../src/entity/scheduler/Scheduler";


export default class Create implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.getRepository(Network).save(require('./data/network.json'));  
    await connection.getRepository(Token).save(require('./data/token.json'));  
    await connection.getRepository(Protocol).save(require('./data/protocol.json'));  
    await connection.getRepository(Abi).save(require('./data/abi.json'));  
    await connection.getRepository(Scheduler).save(require('./data/scheduler.json'));  

  }
}
