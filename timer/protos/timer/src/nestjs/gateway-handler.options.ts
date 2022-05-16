import { protobufPackage }  from '../../gen/nestjs/team/messenger/timer/v1alpha1/timer.service'
import { timerServicePath } from '../paths'
import { includeDirs }      from '../paths'

export const timerGatewayHandler = {
  endpoint: process.env.TIMER_SERVICE_URL || '0.0.0.0:50051',
  protoFilePath: {
    file: timerServicePath,
    load: { arrays: true, keepCase: false, defaults: true, oneofs: true, includeDirs },
  },
  serviceName: 'TimerService',
  packageName: protobufPackage,
  metaData: {
    authorization: ['req', 'headers', 'authorization'],
  },
}

export const timerHandlers = [timerGatewayHandler]
