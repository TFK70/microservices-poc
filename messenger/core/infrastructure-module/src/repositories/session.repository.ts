import { Injectable }           from '@nestjs/common'
import { EventBus }             from '@nestjs/cqrs'
import { InjectRepository }     from '@nestjs/typeorm'

import { Repository }           from 'typeorm'

import { Session }              from '@messenger/domain-module'
import { SessionRepository }    from '@messenger/domain-module'
import { SessionBinding }       from '@messenger/domain-module'

import { SessionEntity }        from '../entities'
import { SessionBindingEntity } from '../entities'

@Injectable()
export class SessionRepositoryImpl extends SessionRepository {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly repository: Repository<SessionEntity>,
    private readonly eventBus: EventBus
  ) {
    super()
  }

  async save(aggregate: Session): Promise<void> {
    await this.repository.save(await this.aggregateToEntity(aggregate))

    if (aggregate.getUncommittedEvents().length > 0) {
      this.eventBus.publishAll(aggregate.getUncommittedEvents())
    }

    aggregate.commit()
  }

  async findById(id: string): Promise<Session | undefined> {
    const entity = await this.repository.findOne({ id })

    return entity ? this.entityToAggregate(entity) : undefined
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete({ id })
  }

  private entityToAggregate(entity: SessionEntity): Session {
    return new Session({
      ...entity,
      bindings: (entity.bindings || []).map(
        (binding) => new SessionBinding(binding.id, binding.userId, binding.sessionId)
      ),
    })
  }

  private async aggregateToEntity(data: Session): Promise<SessionEntity> {
    return Object.assign(new SessionEntity(), data.properties, {
      bindings: data.bindings.map((binding) =>
        Object.assign(new SessionBindingEntity(), binding.properties)),
    })
  }
}
