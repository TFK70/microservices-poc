import _m0  from 'protobufjs/minimal'
/* eslint-disable */
import Long from 'long'

export const protobufPackage = 'team.messenger.timer.v1alpha1'

export interface Timer {
  id: string
  code: string
  time: number
  isRunning: boolean
}

export const TEAM_MESSENGER_TIMER_V1ALPHA1_PACKAGE_NAME = 'team.messenger.timer.v1alpha1'

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}
