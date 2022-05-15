import { protobufPackage }      from '../../gen/nestjs/team/messenger/messenger/v1alpha1/messenger.service'
import { messengerServicePath } from '../paths'
import { includeDirs }          from '../paths'

export const messengerGatewayHandler = {
  endpoint: process.env.MESSENGER_SERVICE_URL || '0.0.0.0:50051',
  protoFilePath: {
    file: messengerServicePath,
    load: { arrays: true, keepCase: false, defaults: true, oneofs: true, includeDirs },
  },
  serviceName: 'MessengerService',
  packageName: protobufPackage,
  metaData: {
    authorization: ['req', 'headers', 'authorization'],
  },
}

export const messengerHandlers = [messengerGatewayHandler]
