import { Module }                    from '@nestjs/common'

import { TimerApplicationModule }    from '@timer/application-module'
import { CqrsAdapterModule }         from '@timer/cqrs-adapter-module'
import { GrpcAdapterModule }         from '@timer/grpc-adapter-module'
import { TimerInfrastructureModule } from '@timer/infrastructure-module'

@Module({
  imports: [
    CqrsAdapterModule.register(),
    GrpcAdapterModule.register(),
    TimerApplicationModule.register(),
    TimerInfrastructureModule.register(),
  ],
})
export class TimerServiceEntrypointModule {}
