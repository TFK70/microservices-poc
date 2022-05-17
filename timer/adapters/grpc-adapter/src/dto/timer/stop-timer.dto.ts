import { IsString }         from 'class-validator'
import { IsNotEmpty }       from 'class-validator'

import { StopTimerRequest } from '@timer/timer-proto'

export class StopTimerDto implements StopTimerRequest {
  @IsNotEmpty()
  @IsString()
  id!: string
}
