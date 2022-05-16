import { CommandHandler }         from '@nestjs/cqrs'
import { ICommandHandler }        from '@nestjs/cqrs'

import assert                     from 'assert'

import { TimerRepository }        from '@timer/domain-module'

import { IncrementTimerCommand }  from '../commands'
import { TimerNotFoundException } from '../exceptions'

@CommandHandler(IncrementTimerCommand)
export class IncrementTimerCommandHandler implements ICommandHandler<IncrementTimerCommand, void> {
  constructor(private readonly timerRepository: TimerRepository) {}

  async execute(command: IncrementTimerCommand) {
    const timer = await this.timerRepository.findById(command.id)

    assert.ok(timer, new TimerNotFoundException(command.id))

    await timer.increment()

    await this.timerRepository.save(timer)
  }
}
