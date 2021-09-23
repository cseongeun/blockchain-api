import "reflect-metadata";
import Container from "typedi";
import { ConnectionOptions, createConnection, getConnectionManager, useContainer } from "typeorm";
import { env } from "./env";
import { ConstraintSnakeNamingStrategy } from "./ConstraintSnakeNamingStrategy";

const config: ConnectionOptions = {
    type: "mysql",
    host: env.database.host,
    port: env.database.port,
    username: env.database.username,
    password: env.database.password,
    database: env.database.database,
    synchronize: false,
    logging: true,
    dropSchema: false,
    entities: [
        "src/entity/**/*.ts",
    ],
    subscribers: [
        "src/subscriber/**/*.ts",
    ],
    migrations: [
        "database/migrations/**/*.ts",
    ],
    cli: {
        "migrationsDir": "database/migrations",
        "subscribersDir": "src/subscriber",
        "entitiesDir": "src/entity",
    },
    // namingStrategy: new ConstraintSnakeNamingStrategy(),
}

export async function createDatabaseConnection(): Promise<void> {
    useContainer(Container);
    if(!getConnectionManager().has("default")) {
        await createConnection(Object.assign(config, {    
            namingStrategy: new ConstraintSnakeNamingStrategy(),
        }))
    }
}

/* 
    typeorm cli 사용 시 config 적용을 위함
*/
export default config