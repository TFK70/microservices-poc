import { User } from '../aggregates'

export abstract class UserRepository {
  create(): User {
    return new User()
  }

  abstract save(aggregate: User): Promise<void>

  abstract findById(id: string): Promise<User | undefined>
}
