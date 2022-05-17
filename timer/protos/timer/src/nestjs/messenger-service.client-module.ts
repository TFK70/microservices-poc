import { DynamicModule }      from '@nestjs/common'
import { Module }             from '@nestjs/common'
import { ClientProxyFactory } from '@nestjs/microservices'
import { Transport }          from '@nestjs/microservices'

import { TimerServiceClient } from '../../gen/nestjs/team/messenger/timer/v1alpha1/timer.service'
import { TIMER_SERVICE_NAME } from '../../gen/nestjs/team/messenger/timer/v1alpha1/timer.service'
import { protobufPackage }    from '../../gen/nestjs/team/messenger/timer/v1alpha1/timer.service'
import { timerServicePath }   from '../paths'
import { includeDirs }        from '../paths'

export interface TimerServiceClientModuleOptions {
  url?: string
}

export const TIMER_SERVICE_CLIENT_TOKEN = `${TIMER_SERVICE_NAME}Client`

@Module({})
export class TimerServiceClientModule {
  static register(options: TimerServiceClientModuleOptions = {}): DynamicModule {
    const timerServiceClientProvider = {
      provide: TIMER_SERVICE_CLIENT_TOKEN,
      useFactory: () => {
        const client = ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: protobufPackage,
            url: options.url || '0.0.0.0:50051',
            protoPath: timerServicePath,
            loader: {
              arrays: true,
              keepCase: false,
              defaults: true,
              oneofs: true,
              includeDirs,
            },
          },
        })

        return client.getService<TimerServiceClient>(TIMER_SERVICE_NAME)
      },
    }

    return {
      global: true,
      module: TimerServiceClientModule,
      providers: [timerServiceClientProvider],
      exports: [timerServiceClientProvider],
    }
  }
}
