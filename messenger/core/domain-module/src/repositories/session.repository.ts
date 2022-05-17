import { Session } from '../aggregates'

export abstract class SessionRepository {
  create(): Session {
    return new Session()
  }

  abstract save(aggregate: Session): Promise<void>

  abstract findById(id: string): Promise<Session | undefined>

  abstract remove(id: string): Promise<void>
}
