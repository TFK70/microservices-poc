import { IsString }        from 'class-validator'
import { IsNotEmpty }      from 'class-validator'

import { JoinUserRequest } from '@messenger/messenger-proto'

export class JoinUserDto implements JoinUserRequest {
  @IsNotEmpty()
  @IsString()
  userId!: string

  @IsNotEmpty()
  @IsString()
  sessionId!: string
}
