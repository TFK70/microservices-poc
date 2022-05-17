import * as controllers         from '../controllers'

import { GrpcPlaygroundModule } from '@atls/nestjs-grpc-playground'
import { DynamicModule }        from '@nestjs/common'
import { Module }               from '@nestjs/common'

import { serverOptions }        from './server-options'

@Module({})
export class GrpcAdapterModule {
  static register(): DynamicModule {
    return {
      module: GrpcAdapterModule,
      controllers: Object.values(controllers),
      imports: [
        GrpcPlaygroundModule.register({
          options: serverOptions.options,
        }),
      ],
    }
  }
}
