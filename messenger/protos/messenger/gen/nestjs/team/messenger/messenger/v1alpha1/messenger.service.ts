import { Metadata }                     from '@grpc/grpc-js'
/* eslint-disable */
import { GrpcMethod }                   from '@nestjs/microservices'

import { GrpcStreamMethod } from '@nestjs/microservices'

import _m0                              from 'protobufjs/minimal'
import Long                             from 'long'
import { Observable }                   from 'rxjs'

import { ReceiveMessagesRequest } from '../../../../team/messenger/messenger/v1alpha1/messenger.payloads'
import { ReceiveMessagesResponse } from '../../../../team/messenger/messenger/v1alpha1/messenger.payloads'
import { SendMessageRequest } from '../../../../team/messenger/messenger/v1alpha1/messenger.payloads'
import { SendMessageResponse } from '../../../../team/messenger/messenger/v1alpha1/messenger.payloads'
import { CreateSessionRequest } from '../../../../team/messenger/messenger/v1alpha1/session.payloads'
import { CreateSessionResponse } from '../../../../team/messenger/messenger/v1alpha1/session.payloads'
import { JoinUserRequest } from '../../../../team/messenger/messenger/v1alpha1/session.payloads'
import { JoinUserResponse } from '../../../../team/messenger/messenger/v1alpha1/session.payloads'
import { KillSessionRequest } from '../../../../team/messenger/messenger/v1alpha1/session.payloads'
import { KillSessionResponse } from '../../../../team/messenger/messenger/v1alpha1/session.payloads'
import { ListSessionsRequest } from '../../../../team/messenger/messenger/v1alpha1/session.payloads'
import { ListSessionsResponse } from '../../../../team/messenger/messenger/v1alpha1/session.payloads'
import { CreateUserRequest } from '../../../../team/messenger/messenger/v1alpha1/user.payloads'

import { CreateUserResponse } from '../../../../team/messenger/messenger/v1alpha1/user.payloads'

import { ListUsersRequest } from '../../../../team/messenger/messenger/v1alpha1/user.payloads'

import { ListUsersResponse } from '../../../../team/messenger/messenger/v1alpha1/user.payloads'

export const protobufPackage = 'team.messenger.messenger.v1alpha1'

export const TEAM_MESSENGER_MESSENGER_V1ALPHA1_PACKAGE_NAME = 'team.messenger.messenger.v1alpha1'

export interface MessengerServiceClient {
  createUser(request: CreateUserRequest, metadata?: Metadata): Observable<CreateUserResponse>

  listUsers(request: ListUsersRequest, metadata?: Metadata): Observable<ListUsersResponse>

  createSession(
    request: CreateSessionRequest,
    metadata?: Metadata
  ): Observable<CreateSessionResponse>

  joinUser(request: JoinUserRequest, metadata?: Metadata): Observable<JoinUserResponse>

  killSession(request: KillSessionRequest, metadata?: Metadata): Observable<KillSessionResponse>

  listSessions(request: ListSessionsRequest, metadata?: Metadata): Observable<ListSessionsResponse>

  sendMessage(request: SendMessageRequest, metadata?: Metadata): Observable<SendMessageResponse>

  receiveMessages(
    request: ReceiveMessagesRequest,
    metadata?: Metadata
  ): Observable<ReceiveMessagesResponse>
}

export interface MessengerServiceController {
  createUser(
    request: CreateUserRequest,
    metadata?: Metadata
  ): Promise<CreateUserResponse> | Observable<CreateUserResponse> | CreateUserResponse

  listUsers(
    request: ListUsersRequest,
    metadata?: Metadata
  ): Promise<ListUsersResponse> | Observable<ListUsersResponse> | ListUsersResponse

  createSession(
    request: CreateSessionRequest,
    metadata?: Metadata
  ): Promise<CreateSessionResponse> | Observable<CreateSessionResponse> | CreateSessionResponse

  joinUser(
    request: JoinUserRequest,
    metadata?: Metadata
  ): Promise<JoinUserResponse> | Observable<JoinUserResponse> | JoinUserResponse

  killSession(
    request: KillSessionRequest,
    metadata?: Metadata
  ): Promise<KillSessionResponse> | Observable<KillSessionResponse> | KillSessionResponse

  listSessions(
    request: ListSessionsRequest,
    metadata?: Metadata
  ): Promise<ListSessionsResponse> | Observable<ListSessionsResponse> | ListSessionsResponse

  sendMessage(
    request: SendMessageRequest,
    metadata?: Metadata
  ): Promise<SendMessageResponse> | Observable<SendMessageResponse> | SendMessageResponse

  receiveMessages(
    request: ReceiveMessagesRequest,
    metadata?: Metadata
  ):
    | Promise<ReceiveMessagesResponse>
    | Observable<ReceiveMessagesResponse>
    | ReceiveMessagesResponse
}

export function MessengerServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createUser',
      'listUsers',
      'createSession',
      'joinUser',
      'killSession',
      'listSessions',
      'sendMessage',
      'receiveMessages',
    ]
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method)
      GrpcMethod('MessengerService', method)(constructor.prototype[method], method, descriptor)
    }
    const grpcStreamMethods: string[] = []
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method)
      GrpcStreamMethod('MessengerService', method)(
        constructor.prototype[method],
        method,
        descriptor
      )
    }
  }
}

export const MESSENGER_SERVICE_NAME = 'MessengerService'

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}
