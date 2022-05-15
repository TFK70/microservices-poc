import { IQueryHandler }        from '@nestjs/cqrs'
import { QueryHandler }         from '@nestjs/cqrs'
import { InjectRepository }     from '@nestjs/typeorm'

import { Repository }           from 'typeorm'

import { ReceiveMessagesQuery } from '@messenger/application-module'

import { MessageEntity }        from '../entities'
import { SessionEntity }        from '../entities'

@QueryHandler(ReceiveMessagesQuery)
export class ReceiveMessagesQueryHandler implements IQueryHandler<ReceiveMessagesQuery> {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly repository: Repository<MessageEntity>,
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>
  ) {}

  async execute({ userId }: ReceiveMessagesQuery) {
    const sessions = await this.sessionRepository
      .createQueryBuilder('session')
      .andWhere('session.userIds @> :userIds', { userIds: [userId] })
      .getMany()

    const sessionIds = sessions.map((session) => session.id)

    const messages = await this.repository
      .createQueryBuilder('message')
      .andWhere('message.senderId = :userId', { userId })
      .andWhere('message.sessionId IN (:sessionIds)', { sessionIds })
      .getMany()

    return { messages }
  }
}
