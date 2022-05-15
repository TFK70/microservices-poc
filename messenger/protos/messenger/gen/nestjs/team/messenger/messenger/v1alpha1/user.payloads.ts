import _m0      from 'protobufjs/minimal'
/* eslint-disable */
import Long     from 'long'

import { User } from '../../../../team/messenger/messenger/v1alpha1/user.types'

export const protobufPackage = 'team.messenger.messenger.v1alpha1'

export interface CreateUserRequest {
  name: string
}

export interface CreateUserResponse {
  id: string
}

export interface ListUsersRequest {}

export interface ListUsersResponse {
  users: User[]
}

export const TEAM_MESSENGER_MESSENGER_V1ALPHA1_PACKAGE_NAME = 'team.messenger.messenger.v1alpha1'

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}
