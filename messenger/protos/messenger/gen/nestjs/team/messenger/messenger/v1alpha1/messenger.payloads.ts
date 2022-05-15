import _m0         from 'protobufjs/minimal'
/* eslint-disable */
import Long        from 'long'

import { Message } from '../../../../team/messenger/messenger/v1alpha1/messenger.types'

export const protobufPackage = 'team.messenger.messenger.v1alpha1'

export interface SendMessageRequest {
  sessionId: string
  payload: string
}

export interface SendMessageResponse {
  id: string
}

export interface ReceiveMessagesRequest {
  userId: string
}

export interface ReceiveMessagesResponse {
  messages: Message[]
}

export const TEAM_MESSENGER_MESSENGER_V1ALPHA1_PACKAGE_NAME = 'team.messenger.messenger.v1alpha1'

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}
