/* eslint-disable no-await-in-loop */

import { Injectable }             from '@nestjs/common'
import { OnApplicationBootstrap } from '@nestjs/common'
import { CommandBus }             from '@nestjs/cqrs'

import { TimerRepository }        from '@timer/domain-module'

import { IncrementTimerCommand }  from '../commands'

@Injectable()
export class TimerService implements OnApplicationBootstrap {
  constructor(
    private readonly timerRepository: TimerRepository,
    private readonly commandBus: CommandBus
  ) {}

  async onApplicationBootstrap() {
    const job = async () => {
      const timers = await this.timerRepository.findRunning()

      for (const timer of timers) {
        await this.commandBus.execute(new IncrementTimerCommand(timer.id))
      }

      setTimeout(job, 1000)
    }

    setTimeout(job, 1000)
  }
}
