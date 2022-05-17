import { IsString }           from 'class-validator'
import { IsNotEmpty }         from 'class-validator'

import { SendMessageRequest } from '@messenger/messenger-proto'

export class SendMessageDto implements SendMessageRequest {
  @IsNotEmpty()
  @IsString()
  senderId!: string

  @IsNotEmpty()
  @IsString()
  sessionId!: string

  @IsNotEmpty()
  @IsString()
  payload!: string
}
