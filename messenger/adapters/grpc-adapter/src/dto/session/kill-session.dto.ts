import { IsString }           from 'class-validator'
import { IsNotEmpty }         from 'class-validator'

import { KillSessionRequest } from '@messenger/messenger-proto'

export class KillSessionDto implements KillSessionRequest {
  @IsNotEmpty()
  @IsString()
  id!: string
}
