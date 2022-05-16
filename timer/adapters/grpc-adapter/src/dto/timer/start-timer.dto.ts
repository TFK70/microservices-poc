import { IsString }          from 'class-validator'
import { IsNotEmpty }        from 'class-validator'

import { StartTimerRequest } from '@timer/timer-proto'

export class StartTimerDto implements StartTimerRequest {
  @IsNotEmpty()
  @IsString()
  id!: string
}
