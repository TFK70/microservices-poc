import { GatewayModule }           from '@atls/nestjs-gateway'
import { GatewaySourceType }       from '@atls/nestjs-gateway'
import { Module }                  from '@nestjs/common'

import { messengerGatewayHandler } from '@messenger/messenger-proto'
import { timerGatewayHandler }     from '@timer/timer-proto'

@Module({
  imports: [
    GatewayModule.register({
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      transforms: {
        namingConvention: {
          fieldNames: 'camelCase',
        },
      },
      sources: [
        {
          name: 'Messenger',
          type: GatewaySourceType.GRPC,
          handler: messengerGatewayHandler,
          transforms: {
            rename: {
              mode: 'bare',
              renames: [
                {
                  from: {
                    type: 'team_messenger_messenger_v1alpha1_(.*)Request_Input',
                  },
                  to: {
                    type: '$1Input',
                  },
                  useRegExpForTypes: true,
                  useRegExpForFields: true,
                },
                {
                  from: {
                    type: 'team_messenger_messenger_v1alpha1_(.*)',
                  },
                  to: {
                    type: '$1',
                  },
                  useRegExpForTypes: true,
                  useRegExpForFields: true,
                },
                {
                  from: {
                    type: 'Mutation',
                    field: 'team_messenger_messenger_v1alpha1_MessengerService_(.*)',
                  },
                  to: {
                    type: 'Mutation',
                    field: '$1',
                  },
                  useRegExpForTypes: true,
                  useRegExpForFields: true,
                },
                {
                  from: {
                    type: 'Query',
                    field: 'team_messenger_messenger_v1alpha1_MessengerService_(.*)',
                  },
                  to: {
                    type: 'Query',
                    field: '$1',
                  },
                  useRegExpForTypes: true,
                  useRegExpForFields: true,
                },
              ],
            },
          },
        },
        {
          name: 'Timer',
          type: GatewaySourceType.GRPC,
          handler: timerGatewayHandler,
          transforms: {
            rename: {
              mode: 'bare',
              renames: [
                {
                  from: {
                    type: 'team_messenger_timer_v1alpha1_(.*)Request_Input',
                  },
                  to: {
                    type: '$1Input',
                  },
                  useRegExpForTypes: true,
                  useRegExpForFields: true,
                },
                {
                  from: {
                    type: 'team_messenger_timer_v1alpha1_(.*)',
                  },
                  to: {
                    type: '$1',
                  },
                  useRegExpForTypes: true,
                  useRegExpForFields: true,
                },
                {
                  from: {
                    type: 'Mutation',
                    field: 'team_messenger_timer_v1alpha1_TimerService_(.*)',
                  },
                  to: {
                    type: 'Mutation',
                    field: '$1',
                  },
                  useRegExpForTypes: true,
                  useRegExpForFields: true,
                },
                {
                  from: {
                    type: 'Query',
                    field: 'team_messenger_timer_v1alpha1_TimerService_(.*)',
                  },
                  to: {
                    type: 'Query',
                    field: '$1',
                  },
                  useRegExpForTypes: true,
                  useRegExpForFields: true,
                },
              ],
            },
          },
        },
      ],
    }),
  ],
})
export class PrivateGatewayEntrypointModule {}
