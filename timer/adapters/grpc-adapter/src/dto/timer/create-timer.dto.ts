import { IsString }           from 'class-validator'
import { IsOptional }         from 'class-validator'

import { CreateTimerRequest } from '@timer/timer-proto'

export class CreateTimerDto implements CreateTimerRequest {
  @IsOptional()
  @IsString()
  code!: string
}
