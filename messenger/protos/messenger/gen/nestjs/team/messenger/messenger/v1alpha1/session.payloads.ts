import _m0         from 'protobufjs/minimal'
/* eslint-disable */
import Long        from 'long'

import { Session } from '../../../../team/messenger/messenger/v1alpha1/session.types'

export const protobufPackage = 'team.messenger.messenger.v1alpha1'

export interface CreateSessionRequest {
  name: string
}

export interface CreateSessionResponse {
  id: string
}

export interface JoinUserRequest {
  userId: string
  sessionId: string
}

export interface JoinUserResponse {
  success: boolean
}

export interface KillSessionRequest {
  id: string
}

export interface KillSessionResponse {
  id: string
}

export interface ListSessionsRequest {}

export interface ListSessionsResponse {
  sessions: Session[]
}

export const TEAM_MESSENGER_MESSENGER_V1ALPHA1_PACKAGE_NAME = 'team.messenger.messenger.v1alpha1'

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}
