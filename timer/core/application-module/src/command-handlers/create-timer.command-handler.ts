import { CommandHandler }     from '@nestjs/cqrs'
import { ICommandHandler }    from '@nestjs/cqrs'

import { TimerRepository }    from '@timer/domain-module'

import { CreateTimerCommand } from '../commands'

@CommandHandler(CreateTimerCommand)
export class CreateTimerCommandHandler implements ICommandHandler<CreateTimerCommand, void> {
  constructor(private readonly timerRepository: TimerRepository) {}

  async execute(command: CreateTimerCommand) {
    const timer = this.timerRepository.create()

    await timer.create(command.id, command.code)

    await this.timerRepository.save(timer)
  }
}
