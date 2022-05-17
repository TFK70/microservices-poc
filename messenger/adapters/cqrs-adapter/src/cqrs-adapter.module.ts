import { DynamicModule } from '@nestjs/common'
import { Module }        from '@nestjs/common'
import { CqrsModule }    from '@nestjs/cqrs'

@Module({})
export class CqrsAdapterModule {
  static register(): DynamicModule {
    return {
      global: true,
      module: CqrsAdapterModule,
      imports: [CqrsModule],
      exports: [CqrsModule],
    }
  }
}
