import { CommandHandler }         from '@nestjs/cqrs'
import { ICommandHandler }        from '@nestjs/cqrs'

import assert                     from 'assert'

import { TimerRepository }        from '@timer/domain-module'

import { StopTimerCommand }       from '../commands'
import { TimerNotFoundException } from '../exceptions'

@CommandHandler(StopTimerCommand)
export class StopTimerCommandHandler implements ICommandHandler<StopTimerCommand, void> {
  constructor(private readonly timerRepository: TimerRepository) {}

  async execute(command: StopTimerCommand) {
    const timer = await this.timerRepository.findById(command.id)

    assert.ok(timer, new TimerNotFoundException(command.id))

    await timer.stop()

    await this.timerRepository.save(timer)
  }
}
