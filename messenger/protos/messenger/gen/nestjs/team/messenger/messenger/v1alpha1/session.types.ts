import _m0  from 'protobufjs/minimal'
/* eslint-disable */
import Long from 'long'

export const protobufPackage = 'team.messenger.messenger.v1alpha1'

export interface Session {
  id: string
  name: string
  userIds: string[]
}

export const TEAM_MESSENGER_MESSENGER_V1ALPHA1_PACKAGE_NAME = 'team.messenger.messenger.v1alpha1'

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}
