import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Token } from "../../../src/entity/token/Token";

export default class Create implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    console.log('ee')
    await connection.getRepository(Token).save(require('./seed.json'));
  }
}