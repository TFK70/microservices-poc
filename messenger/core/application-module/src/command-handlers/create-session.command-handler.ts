import { CommandHandler }       from '@nestjs/cqrs'
import { ICommandHandler }      from '@nestjs/cqrs'

import { SessionRepository }    from '@messenger/domain-module'

import { CreateSessionCommand } from '../commands'

@CommandHandler(CreateSessionCommand)
export class CreateSessionCommandHandler implements ICommandHandler<CreateSessionCommand, void> {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(command: CreateSessionCommand) {
    const session = this.sessionRepository.create()

    await session.create(command.id, command.name)

    await this.sessionRepository.save(session)
  }
}
