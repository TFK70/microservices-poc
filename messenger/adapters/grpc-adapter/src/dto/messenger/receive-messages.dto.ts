import { IsString }               from 'class-validator'
import { IsNotEmpty }             from 'class-validator'

import { ReceiveMessagesRequest } from '@messenger/messenger-proto'

export class ReceiveMessagesDto implements ReceiveMessagesRequest {
  @IsNotEmpty()
  @IsString()
  userId!: string
}
