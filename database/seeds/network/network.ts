import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Network } from "../../../src/entity/network/Network";

export default class Create implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    await connection.getRepository(Network).save(require('./seed.json'));
  }
}