import { Metadata }            from '@grpc/grpc-js'
/* eslint-disable */
import { GrpcMethod }          from '@nestjs/microservices'
import { GrpcStreamMethod }    from '@nestjs/microservices'

import _m0                     from 'protobufjs/minimal'
import Long                    from 'long'
import { Observable }          from 'rxjs'

import { CreateTimerRequest }  from '../../../../team/messenger/timer/v1alpha1/timer.payloads'
import { CreateTimerResponse } from '../../../../team/messenger/timer/v1alpha1/timer.payloads'
import { ListTimersRequest }   from '../../../../team/messenger/timer/v1alpha1/timer.payloads'
import { ListTimersResponse }  from '../../../../team/messenger/timer/v1alpha1/timer.payloads'
import { RemoveTimerRequest }  from '../../../../team/messenger/timer/v1alpha1/timer.payloads'
import { RemoveTimerResponse } from '../../../../team/messenger/timer/v1alpha1/timer.payloads'
import { StartTimerRequest }   from '../../../../team/messenger/timer/v1alpha1/timer.payloads'
import { StartTimerResponse }  from '../../../../team/messenger/timer/v1alpha1/timer.payloads'
import { StopTimerRequest }    from '../../../../team/messenger/timer/v1alpha1/timer.payloads'
import { StopTimerResponse }   from '../../../../team/messenger/timer/v1alpha1/timer.payloads'

export const protobufPackage = 'team.messenger.timer.v1alpha1'

export const TEAM_MESSENGER_TIMER_V1ALPHA1_PACKAGE_NAME = 'team.messenger.timer.v1alpha1'

export interface TimerServiceClient {
  createTimer(request: CreateTimerRequest, metadata?: Metadata): Observable<CreateTimerResponse>

  startTimer(request: StartTimerRequest, metadata?: Metadata): Observable<StartTimerResponse>

  stopTimer(request: StopTimerRequest, metadata?: Metadata): Observable<StopTimerResponse>

  removeTimer(request: RemoveTimerRequest, metadata?: Metadata): Observable<RemoveTimerResponse>

  listTimers(request: ListTimersRequest, metadata?: Metadata): Observable<ListTimersResponse>
}

export interface TimerServiceController {
  createTimer(
    request: CreateTimerRequest,
    metadata?: Metadata
  ): Promise<CreateTimerResponse> | Observable<CreateTimerResponse> | CreateTimerResponse

  startTimer(
    request: StartTimerRequest,
    metadata?: Metadata
  ): Promise<StartTimerResponse> | Observable<StartTimerResponse> | StartTimerResponse

  stopTimer(
    request: StopTimerRequest,
    metadata?: Metadata
  ): Promise<StopTimerResponse> | Observable<StopTimerResponse> | StopTimerResponse

  removeTimer(
    request: RemoveTimerRequest,
    metadata?: Metadata
  ): Promise<RemoveTimerResponse> | Observable<RemoveTimerResponse> | RemoveTimerResponse

  listTimers(
    request: ListTimersRequest,
    metadata?: Metadata
  ): Promise<ListTimersResponse> | Observable<ListTimersResponse> | ListTimersResponse
}

export function TimerServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createTimer',
      'startTimer',
      'stopTimer',
      'removeTimer',
      'listTimers',
    ]
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method)
      GrpcMethod('TimerService', method)(constructor.prototype[method], method, descriptor)
    }
    const grpcStreamMethods: string[] = []
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method)
      GrpcStreamMethod('TimerService', method)(constructor.prototype[method], method, descriptor)
    }
  }
}

export const TIMER_SERVICE_NAME = 'TimerService'

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}
