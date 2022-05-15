import * as CommandHandlers from '../command-handlers'

import { DynamicModule }    from '@nestjs/common'
import { Module }           from '@nestjs/common'

@Module({})
export class MessengerApplicationeModule {
  static register(): DynamicModule {
    return {
      module: MessengerApplicationeModule,
      providers: [...Object.values(CommandHandlers)],
    }
  }
}
