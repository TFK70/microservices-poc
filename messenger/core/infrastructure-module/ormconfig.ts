import * as entities   from './src/entities'
import * as migrations from './src/migrations'

export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'db',
  migrations: Object.values(migrations),
  entities: Object.values(entities),
  uuidExtension: 'pgcrypto',
  logging: true,
  cli: {
    migrationsDir: 'src/migrations',
  },
}
