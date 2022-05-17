import * as CommandHandlers from '../command-handlers'
import * as Services        from '../services'

import { DynamicModule }    from '@nestjs/common'
import { Module }           from '@nestjs/common'

@Module({})
export class TimerApplicationModule {
  static register(): DynamicModule {
    return {
      module: TimerApplicationModule,
      providers: [...Object.values(CommandHandlers), ...Object.values(Services)],
    }
  }
}
