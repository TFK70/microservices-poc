import * as entities                               from '../entities'
import * as queryHandlers                          from '../query-handlers'

import { DynamicModule }                           from '@nestjs/common'
import { Module }                                  from '@nestjs/common'
import { TypeOrmModule }                           from '@nestjs/typeorm'

import { MessageRepository }                       from '@messenger/domain-module'
import { UserRepository }                          from '@messenger/domain-module'
import { SessionRepository }                       from '@messenger/domain-module'

import { MessageRepositoryImpl }                   from '../repositories'
import { UserRepositoryImpl }                      from '../repositories'
import { SessionRepositoryImpl }                   from '../repositories'
import { MESSENGER_INFRASTRUCTURE_MODULE_OPTIONS } from './messenger-infrastructure-module.constants'
import { MessengerTypeOrmOptions }                 from './messenger-infrastructure-module.interfaces'
import { TypeOrmConfig }                           from './typeorm.config'

@Module({})
export class MessengerInfrastructureModule {
  static register(options: MessengerTypeOrmOptions = {}): DynamicModule {
    return {
      global: true,
      module: MessengerInfrastructureModule,
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
          provide: MESSENGER_INFRASTRUCTURE_MODULE_OPTIONS,
          useValue: options,
        },
        {
          provide: MessageRepository,
          useClass: MessageRepositoryImpl,
        },
        {
          provide: UserRepository,
          useClass: UserRepositoryImpl,
        },
        {
          provide: SessionRepository,
          useClass: SessionRepositoryImpl,
        },
      ],
      exports: [
        TypeOrmModule,
        TypeOrmConfig,
        {
          provide: MessageRepository,
          useClass: MessageRepositoryImpl,
        },
        {
          provide: UserRepository,
          useClass: UserRepositoryImpl,
        },
        {
          provide: SessionRepository,
          useClass: SessionRepositoryImpl,
        },
      ],
    }
  }
}
