export interface MessengerTypeOrmDbOptions {
  port?: number
  host?: string
  database?: string
  username?: string
  password?: string
}

export interface MessengerTypeOrmOptions {
  db?: MessengerTypeOrmDbOptions
}
