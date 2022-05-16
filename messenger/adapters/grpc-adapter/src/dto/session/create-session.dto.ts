import { IsString }             from 'class-validator'
import { IsNotEmpty }           from 'class-validator'

import { CreateSessionRequest } from '@messenger/messenger-proto'

export class CreateSessionDto implements CreateSessionRequest {
  @IsNotEmpty()
  @IsString()
  name!: string
}
