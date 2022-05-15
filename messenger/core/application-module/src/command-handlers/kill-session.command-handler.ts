import { CommandHandler }           from '@nestjs/cqrs'
import { ICommandHandler }          from '@nestjs/cqrs'

import assert                       from 'assert'

import { SessionRepository }        from '@messenger/domain-module'

import { KillSessionCommand }       from '../commands'
import { SessionNotFoundException } from '../exceptions'

@CommandHandler(KillSessionCommand)
export class KillSessionCommandHandler implements ICommandHandler<KillSessionCommand, void> {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(command: KillSessionCommand) {
    const session = await this.sessionRepository.findById(command.id)

    assert.ok(session, new SessionNotFoundException(command.id))

    await this.sessionRepository.remove(command.id)
  }
}
