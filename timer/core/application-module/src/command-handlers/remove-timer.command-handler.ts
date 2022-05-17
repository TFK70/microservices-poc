import { CommandHandler }         from '@nestjs/cqrs'
import { ICommandHandler }        from '@nestjs/cqrs'

import assert                     from 'assert'

import { TimerRepository }        from '@timer/domain-module'

import { RemoveTimerCommand }     from '../commands'
import { TimerNotFoundException } from '../exceptions'

@CommandHandler(RemoveTimerCommand)
export class RemoveTimerCommandHandler implements ICommandHandler<RemoveTimerCommand, void> {
  constructor(private readonly timerRepository: TimerRepository) {}

  async execute(command: RemoveTimerCommand) {
    const timer = await this.timerRepository.findById(command.id)

    assert.ok(timer, new TimerNotFoundException(command.id))

    await this.timerRepository.remove(command.id)
  }
}
