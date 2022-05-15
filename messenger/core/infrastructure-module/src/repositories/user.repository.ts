import { Injectable }       from '@nestjs/common'
import { EventBus }         from '@nestjs/cqrs'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository }       from 'typeorm'

import { User }             from '@messenger/domain-module'
import { UserRepository }   from '@messenger/domain-module'

import { UserEntity }       from '../entities'

@Injectable()
export class UserRepositoryImpl extends UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly eventBus: EventBus
  ) {
    super()
  }

  async save(aggregate: User): Promise<void> {
    await this.repository.save(await this.aggregateToEntity(aggregate))

    if (aggregate.getUncommittedEvents().length > 0) {
      this.eventBus.publishAll(aggregate.getUncommittedEvents())
    }

    aggregate.commit()
  }

  async findById(id: string): Promise<User | undefined> {
    const entity = await this.repository.findOne({ id })

    return entity ? this.entityToAggregate(entity) : undefined
  }

  private entityToAggregate(entity: UserEntity): User {
    return new User(entity)
  }

  private async aggregateToEntity(data: User): Promise<UserEntity> {
    return Object.assign(new UserEntity(), data.properties)
  }
}
