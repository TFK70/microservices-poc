export interface TimerTypeOrmDbOptions {
  port?: number
  host?: string
  database?: string
  username?: string
  password?: string
}

export interface TimerTypeOrmOptions {
  db?: TimerTypeOrmDbOptions
}
