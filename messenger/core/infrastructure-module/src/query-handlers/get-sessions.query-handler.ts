import { IQueryHandler }    from '@nestjs/cqrs'
import { QueryHandler }     from '@nestjs/cqrs'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository }       from 'typeorm'

import { GetSessionsQuery } from '@messenger/application-module'

import { SessionEntity }    from '../entities'

@QueryHandler(GetSessionsQuery)
export class GetSessionsQueryHandler implements IQueryHandler<GetSessionsQuery> {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly repository: Repository<SessionEntity>
  ) {}

  async execute(query: GetSessionsQuery) {
    const sessions = await this.repository.createQueryBuilder('session').getMany()

    return { sessions }
  }
}
