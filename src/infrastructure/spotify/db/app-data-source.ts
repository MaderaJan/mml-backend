import "reflect-metadata"
import { DataSource } from "typeorm"
import { Account } from "./entity/account"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "madera",
    database: "mml",
    synchronize: true,
    logging: false,
    entities: [Account],
    migrations: [],
    subscribers: [],
})