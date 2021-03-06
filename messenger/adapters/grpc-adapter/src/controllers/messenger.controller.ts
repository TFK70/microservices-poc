import { GrpcExceptionsFilter }              from '@atls/nestjs-grpc-errors'
import { GrpcValidationPipe }                from '@atls/nestjs-grpc-errors'
import { Controller }                        from '@nestjs/common'
import { UseFilters }                        from '@nestjs/common'
import { UsePipes }                          from '@nestjs/common'
import { CommandBus }                        from '@nestjs/cqrs'
import { QueryBus }                          from '@nestjs/cqrs'

import { v4 as uuid }                        from 'uuid'

import { CreateSessionCommand }              from '@messenger/application-module'
import { CreateUserCommand }                 from '@messenger/application-module'
import { JoinUserCommand }                   from '@messenger/application-module'
import { GetSessionsQuery }                  from '@messenger/application-module'
import { GetUsersQuery }                     from '@messenger/application-module'
import { ReceiveMessagesQuery }              from '@messenger/application-module'
import { SendMessageCommand }                from '@messenger/application-module'
import { MessengerServiceController }        from '@messenger/messenger-proto'
import { MessengerServiceControllerMethods } from '@messenger/messenger-proto'
import { CreateSessionResponse }             from '@messenger/messenger-proto'
import { CreateUserResponse }                from '@messenger/messenger-proto'
import { ListUsersResponse }                 from '@messenger/messenger-proto'
import { ListSessionsResponse }              from '@messenger/messenger-proto'
import { SendMessageResponse }               from '@messenger/messenger-proto'
import { JoinUserResponse }                  from '@messenger/messenger-proto'
import { ReceiveMessagesResponse }           from '@messenger/messenger-proto'

import { CreateSessionDto }                  from '../dto'
import { SendMessageDto }                    from '../dto'
import { CreateUserDto }                     from '../dto'
import { ReceiveMessagesDto }                from '../dto'
import { ListSessionsDto }                   from '../dto'
import { ListUsersDto }                      from '../dto'
import { JoinUserDto }                       from '../dto'

@Controller()
@MessengerServiceControllerMethods()
@UseFilters(new GrpcExceptionsFilter())
export class MessengerController implements MessengerServiceController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @UsePipes(new GrpcValidationPipe())
  async createSession(request: CreateSessionDto): Promise<CreateSessionResponse> {
    const command = new CreateSessionCommand(uuid(), request.name)

    await this.commandBus.execute(command)

    return { id: command.id }
  }

  @UsePipes(new GrpcValidationPipe())
  async createUser(request: CreateUserDto): Promise<CreateUserResponse> {
    const command = new CreateUserCommand(uuid(), request.name)

    await this.commandBus.execute(command)

    return { id: command.id }
  }

  @UsePipes(new GrpcValidationPipe())
  async listUsers(request: ListUsersDto): Promise<ListUsersResponse> {
    return this.queryBus.execute(new GetUsersQuery())
  }

  @UsePipes(new GrpcValidationPipe())
  async listSessions(request: ListSessionsDto): Promise<ListSessionsResponse> {
    return this.queryBus.execute(new GetSessionsQuery())
  }

  @UsePipes(new GrpcValidationPipe())
  async joinUser(request: JoinUserDto): Promise<JoinUserResponse> {
    await this.commandBus.execute(new JoinUserCommand(request.userId, request.sessionId))

    return { success: true }
  }

  @UsePipes(new GrpcValidationPipe())
  async sendMessage(request: SendMessageDto): Promise<SendMessageResponse> {
    const command = new SendMessageCommand(
      uuid(),
      new Date().toLocaleDateString(),
      request.senderId,
      request.sessionId,
      request.payload
    )

    await this.commandBus.execute(command)

    return { id: command.messageId }
  }

  @UsePipes(new GrpcValidationPipe())
  async receiveMessages(request: ReceiveMessagesDto): Promise<ReceiveMessagesResponse> {
    return this.queryBus.execute(new ReceiveMessagesQuery(request.userId))
  }
}
