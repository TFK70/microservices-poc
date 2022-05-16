import _m0       from 'protobufjs/minimal'
/* eslint-disable */
import Long      from 'long'

import { Timer } from '../../../../team/messenger/timer/v1alpha1/timer.types'

export const protobufPackage = 'team.messenger.timer.v1alpha1'

export interface CreateTimerRequest {
  code: string
}

export interface CreateTimerResponse {
  id: string
}

export interface StartTimerRequest {
  id: string
}

export interface StartTimerResponse {
  id: string
}

export interface StopTimerRequest {
  id: string
}

export interface StopTimerResponse {
  id: string
}

export interface RemoveTimerRequest {
  id: string
}

export interface RemoveTimerResponse {
  id: string
}

export interface ListTimersRequest {}

export interface ListTimersResponse {
  timers: Timer[]
}

export const TEAM_MESSENGER_TIMER_V1ALPHA1_PACKAGE_NAME = 'team.messenger.timer.v1alpha1'

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}
