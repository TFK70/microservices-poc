import * as entities                           from '../entities'
import * as queryHandlers                      from '../query-handlers'

import { DynamicModule }                       from '@nestjs/common'
import { Module }                              from '@nestjs/common'
import { TypeOrmModule }                       from '@nestjs/typeorm'

import { TimerRepository }                     from '@timer/domain-module'

import { TimerRepositoryImpl }                 from '../repositories'
import { TIMER_INFRASTRUCTURE_MODULE_OPTIONS } from './timer-infrastructure-module.constants'
import { TimerTypeOrmOptions }                 from './timer-infrastructure-module.interfaces'
import { TypeOrmConfig }                       from './typeorm.config'

@Module({})
export class TimerInfrastructureModule {
  static register(options: TimerTypeOrmOptions = {}): DynamicModule {
    return {
      global: true,
      module: TimerInfrastructureModule,
      imports: [
        TypeOrmModule.forFeature(Object.values(entities)),
        TypeOrmModule.forRootAsync({
          useExisting: TypeOrmConfig,
        }),
      ],
      providers: [
        ...Object.values(queryHandlers),
        TypeOrmConfig,
        {
          provide: TIMER_INFRASTRUCTURE_MODULE_OPTIONS,
          useValue: options,
        },
        {
          provide: TimerRepository,
          useClass: TimerRepositoryImpl,
        },
      ],
      exports: [
        TypeOrmModule,
        TypeOrmConfig,
        {
          provide: TimerRepository,
          useClass: TimerRepositoryImpl,
        },
      ],
    }
  }
}
