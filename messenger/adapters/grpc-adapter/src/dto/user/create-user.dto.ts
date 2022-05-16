import { IsString }          from 'class-validator'
import { IsNotEmpty }        from 'class-validator'

import { CreateUserRequest } from '@messenger/messenger-proto'

export class CreateUserDto implements CreateUserRequest {
  @IsNotEmpty()
  @IsString()
  name!: string
}
