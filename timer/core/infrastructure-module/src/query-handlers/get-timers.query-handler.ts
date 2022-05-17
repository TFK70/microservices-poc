import { IQueryHandler }    from '@nestjs/cqrs'
import { QueryHandler }     from '@nestjs/cqrs'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository }       from 'typeorm'

import { GetTimersQuery }   from '@timer/application-module'

import { TimerEntity }      from '../entities'

@QueryHandler(GetTimersQuery)
export class GetTimersQueryHandler implements IQueryHandler<GetTimersQuery> {
  constructor(
    @InjectRepository(TimerEntity)
    private readonly repository: Repository<TimerEntity>
  ) {}

  async execute(query: GetTimersQuery) {
    const timers = await this.repository.createQueryBuilder('timer').getMany()

    return { timers }
  }
}
