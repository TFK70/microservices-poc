import { Module }                        from '@nestjs/common'

import { MessengerApplicationeModule }   from '@messenger/application-module'
import { CqrsAdapterModule }             from '@messenger/cqrs-adapter-module'
import { GrpcAdapterModule }             from '@messenger/grpc-adapter-module'
import { MessengerInfrastructureModule } from '@messenger/infrastructure-module'

@Module({
  imports: [
    CqrsAdapterModule.register(),
    GrpcAdapterModule.register(),
    MessengerApplicationeModule.register(),
    MessengerInfrastructureModule.register(),
  ],
})
export class MessengerServiceEntrypointModule {}
