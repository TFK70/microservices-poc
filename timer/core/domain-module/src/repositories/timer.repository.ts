import { Timer } from '../aggregates'

export abstract class TimerRepository {
  create(): Timer {
    return new Timer()
  }

  abstract save(aggregate: Timer): Promise<void>

  abstract findById(id: string): Promise<Timer | undefined>

  abstract findRunning(): Promise<Array<Timer>>

  abstract remove(id: string): Promise<void>
}
