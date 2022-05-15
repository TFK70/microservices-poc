import { CommandHandler }           from '@nestjs/cqrs'
import { ICommandHandler }          from '@nestjs/cqrs'

import assert                       from 'assert'
import { v4 as uuid }               from 'uuid'

import { UserRepository }           from '@messenger/domain-module'
import { SessionRepository }        from '@messenger/domain-module'

import { JoinUserCommand }          from '../commands'
import { SessionNotFoundException } from '../exceptions'
import { UserNotFoundException }    from '../exceptions'

@CommandHandler(JoinUserCommand)
export class JoinUserCommandHandler implements ICommandHandler<JoinUserCommand, void> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository
  ) {}

  async execute(command: JoinUserCommand) {
    const user = await this.userRepository.findById(command.userId)
    const session = await this.sessionRepository.findById(command.sessionId)

    assert.ok(user, new UserNotFoundException(command.userId))
    assert.ok(session, new SessionNotFoundException(command.sessionId))

    await session.joinUser(uuid(), command.userId)

    await this.sessionRepository.save(session)
  }
}
