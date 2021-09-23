import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Protocol } from "../../src/entity/protocol/Protocol";

export default class Create implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    await connection.getRepository(Protocol).save(require('./seed.json'));
  }
}