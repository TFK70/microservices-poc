import { IsString }           from 'class-validator'
import { IsNotEmpty }         from 'class-validator'

import { RemoveTimerRequest } from '@timer/timer-proto'

export class RemoveTimerDto implements RemoveTimerRequest {
  @IsNotEmpty()
  @IsString()
  id!: string
}
