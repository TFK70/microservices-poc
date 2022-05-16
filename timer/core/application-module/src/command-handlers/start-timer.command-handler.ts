import { CommandHandler }         from '@nestjs/cqrs'
import { ICommandHandler }        from '@nestjs/cqrs'

import assert                     from 'assert'

import { TimerRepository }        from '@timer/domain-module'

import { StartTimerCommand }      from '../commands'
import { TimerNotFoundException } from '../exceptions'

@CommandHandler(StartTimerCommand)
export class StartTimerCommandHandler implements ICommandHandler<StartTimerCommand, void> {
  constructor(private readonly timerRepository: TimerRepository) {}

  async execute(command: StartTimerCommand) {
    const timer = await this.timerRepository.findById(command.id)

    assert.ok(timer, new TimerNotFoundException(command.id))

    await timer.start()

    await this.timerRepository.save(timer)
  }
}
