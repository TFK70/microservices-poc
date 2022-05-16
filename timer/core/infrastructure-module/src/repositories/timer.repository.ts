import { Injectable }       from '@nestjs/common'
import { EventBus }         from '@nestjs/cqrs'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository }       from 'typeorm'

import { Timer }            from '@timer/domain-module'
import { TimerRepository }  from '@timer/domain-module'

import { TimerEntity }      from '../entities'

@Injectable()
export class TimerRepositoryImpl extends TimerRepository {
  constructor(
    @InjectRepository(TimerEntity)
    private readonly repository: Repository<TimerEntity>,
    private readonly eventBus: EventBus
  ) {
    super()
  }

  async save(aggregate: Timer): Promise<void> {
    await this.repository.save(await this.aggregateToEntity(aggregate))

    if (aggregate.getUncommittedEvents().length > 0) {
      this.eventBus.publishAll(aggregate.getUncommittedEvents())
    }

    aggregate.commit()
  }

  async findById(id: string): Promise<Timer | undefined> {
    const entity = await this.repository.findOne({ id })

    return entity ? this.entityToAggregate(entity) : undefined
  }

  async findRunning(): Promise<Array<Timer>> {
    const timers = await this.repository
      .createQueryBuilder('timer')
      .andWhere('timer.isRunning = :isRunning', { isRunning: true })
      .getMany()

    return timers.map((timer) => this.entityToAggregate(timer))
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete({ id })
  }

  private entityToAggregate(entity: TimerEntity): Timer {
    return new Timer(entity)
  }

  private async aggregateToEntity(data: Timer): Promise<TimerEntity> {
    return Object.assign(new TimerEntity(), data.properties)
  }
}
