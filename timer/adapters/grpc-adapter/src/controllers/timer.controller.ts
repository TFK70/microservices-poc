import { GrpcExceptionsFilter }          from '@atls/nestjs-grpc-errors'
import { GrpcValidationPipe }            from '@atls/nestjs-grpc-errors'
import { Controller }                    from '@nestjs/common'
import { UseFilters }                    from '@nestjs/common'
import { UsePipes }                      from '@nestjs/common'
import { CommandBus }                    from '@nestjs/cqrs'
import { QueryBus }                      from '@nestjs/cqrs'

import { v4 as uuid }                    from 'uuid'

import { CreateTimerCommand }            from '@timer/application-module'
import { StartTimerCommand }             from '@timer/application-module'
import { StopTimerCommand }              from '@timer/application-module'
import { RemoveTimerCommand }            from '@timer/application-module'
import { GetTimersQuery }                from '@timer/application-module'
import { TimerServiceController }        from '@timer/timer-proto'
import { TimerServiceControllerMethods } from '@timer/timer-proto'
import { CreateTimerResponse }           from '@timer/timer-proto'
import { StartTimerResponse }            from '@timer/timer-proto'
import { StopTimerResponse }             from '@timer/timer-proto'
import { RemoveTimerResponse }           from '@timer/timer-proto'
import { ListTimersResponse }            from '@timer/timer-proto'

import { CreateTimerDto }                from '../dto'
import { StartTimerDto }                 from '../dto'
import { StopTimerDto }                  from '../dto'
import { ListTimersDto }                 from '../dto'
import { RemoveTimerDto }                from '../dto'

@Controller()
@TimerServiceControllerMethods()
@UseFilters(new GrpcExceptionsFilter())
export class TimerController implements TimerServiceController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @UsePipes(new GrpcValidationPipe())
  async createTimer(request: CreateTimerDto): Promise<CreateTimerResponse> {
    const command = new CreateTimerCommand(uuid(), request.code)

    await this.commandBus.execute(command)

    return { id: command.id }
  }

  @UsePipes(new GrpcValidationPipe())
  async startTimer(request: StartTimerDto): Promise<StartTimerResponse> {
    const command = new StartTimerCommand(request.id)

    await this.commandBus.execute(command)

    return { id: command.id }
  }

  @UsePipes(new GrpcValidationPipe())
  async stopTimer(request: StopTimerDto): Promise<StopTimerResponse> {
    const command = new StopTimerCommand(request.id)

    await this.commandBus.execute(command)

    return { id: command.id }
  }

  @UsePipes(new GrpcValidationPipe())
  async removeTimer(request: RemoveTimerDto): Promise<RemoveTimerResponse> {
    const command = new RemoveTimerCommand(request.id)

    await this.commandBus.execute(command)

    return { id: command.id }
  }

  @UsePipes(new GrpcValidationPipe())
  async listTimers(request: ListTimersDto): Promise<ListTimersResponse> {
    return this.queryBus.execute(new GetTimersQuery())
  }
}
