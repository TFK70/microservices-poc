import { IQueryHandler }        from '@nestjs/cqrs'
import { QueryHandler }         from '@nestjs/cqrs'
import { InjectRepository }     from '@nestjs/typeorm'

import { Repository }           from 'typeorm'

import { ReceiveMessagesQuery } from '@messenger/application-module'

import { MessageEntity }        from '../entities'
import { SessionBindingEntity } from '../entities'

@QueryHandler(ReceiveMessagesQuery)
export class ReceiveMessagesQueryHandler implements IQueryHandler<ReceiveMessagesQuery> {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly repository: Repository<MessageEntity>,
    @InjectRepository(SessionBindingEntity)
    private readonly sessionBindingRepository: Repository<SessionBindingEntity>
  ) {}

  async execute({ userId }: ReceiveMessagesQuery) {
    const sessionBindings = await this.sessionBindingRepository
      .createQueryBuilder('binding')
      .andWhere('binding.userId = :userId', { userId })
      .getMany()

    const sessionIds = sessionBindings.map((binding) => binding.sessionId)

    const messages = await this.repository
      .createQueryBuilder('message')
      .andWhere('message.sessionId IN (:...sessionIds)', { sessionIds })
      .getMany()

    return { messages }
  }
}
