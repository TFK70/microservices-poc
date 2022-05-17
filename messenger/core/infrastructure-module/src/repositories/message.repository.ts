import { Injectable }        from '@nestjs/common'
import { EventBus }          from '@nestjs/cqrs'
import { InjectRepository }  from '@nestjs/typeorm'

import { Repository }        from 'typeorm'

import { Message }           from '@messenger/domain-module'
import { MessageRepository } from '@messenger/domain-module'

import { MessageEntity }     from '../entities'

@Injectable()
export class MessageRepositoryImpl extends MessageRepository {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly repository: Repository<MessageEntity>,
    private readonly eventBus: EventBus
  ) {
    super()
  }

  async save(aggregate: Message): Promise<void> {
    await this.repository.save(await this.aggregateToEntity(aggregate))

    if (aggregate.getUncommittedEvents().length > 0) {
      this.eventBus.publishAll(aggregate.getUncommittedEvents())
    }

    aggregate.commit()
  }

  async findById(id: string): Promise<Message | undefined> {
    const entity = await this.repository.findOne({ id })

    return entity ? this.entityToAggregate(entity) : undefined
  }

  private entityToAggregate(entity: MessageEntity): Message {
    return new Message(entity)
  }

  private async aggregateToEntity(data: Message): Promise<MessageEntity> {
    return Object.assign(new MessageEntity(), data.properties)
  }
}
