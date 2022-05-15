import { IQueryHandler }    from '@nestjs/cqrs'
import { QueryHandler }     from '@nestjs/cqrs'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository }       from 'typeorm'

import { GetUsersQuery }    from '@messenger/application-module'

import { UserEntity }       from '../entities'

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

  async execute(query: GetUsersQuery) {
    const users = await this.repository.createQueryBuilder('user').getMany()

    return { users }
  }
}
