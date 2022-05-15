import { DynamicModule }          from '@nestjs/common'
import { Module }                 from '@nestjs/common'
import { ClientProxyFactory }     from '@nestjs/microservices'
import { Transport }              from '@nestjs/microservices'

import { MessengerServiceClient } from '../../gen/nestjs/team/messenger/messenger/v1alpha1/messenger.service'
import { MESSENGER_SERVICE_NAME } from '../../gen/nestjs/team/messenger/messenger/v1alpha1/messenger.service'
import { protobufPackage }        from '../../gen/nestjs/team/messenger/messenger/v1alpha1/messenger.service'
import { messengerServicePath }   from '../paths'
import { includeDirs }            from '../paths'

export interface MessengerServiceClientModuleOptions {
  url?: string
}

export const MESSENGER_SERVICE_CLIENT_TOKEN = `${MESSENGER_SERVICE_NAME}Client`

@Module({})
export class MessengerServiceClientModule {
  static register(options: MessengerServiceClientModuleOptions = {}): DynamicModule {
    const messengerServiceClientProvider = {
      provide: MESSENGER_SERVICE_CLIENT_TOKEN,
      useFactory: () => {
        const client = ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: protobufPackage,
            url: options.url || '0.0.0.0:50051',
            protoPath: messengerServicePath,
            loader: {
              arrays: true,
              keepCase: false,
              defaults: true,
              oneofs: true,
              includeDirs,
            },
          },
        })

        return client.getService<MessengerServiceClient>(MESSENGER_SERVICE_NAME)
      },
    }

    return {
      global: true,
      module: MessengerServiceClientModule,
      providers: [messengerServiceClientProvider],
      exports: [messengerServiceClientProvider],
    }
  }
}
