import { Transport }            from '@nestjs/microservices'
import { GrpcOptions }          from '@nestjs/microservices'
import { serverReflectionPath } from '@atls/nestjs-grpc-reflection/proto'

import { protobufPackage }      from '@messenger/messenger-proto'
import { includeDirs }          from '@messenger/messenger-proto'
import { messengerServicePath } from '@messenger/messenger-proto'

export const serverOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['grpc.reflection.v1alpha', protobufPackage],
    protoPath: [serverReflectionPath, messengerServicePath],
    url: '0.0.0.0:50051',
    loader: {
      arrays: true,
      enums: String,
      keepCase: false,
      defaults: true,
      oneofs: true,
      includeDirs,
    },
  },
}
