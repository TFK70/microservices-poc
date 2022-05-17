import { Entity }        from 'typeorm'
import { Column }        from 'typeorm'
import { PrimaryColumn } from 'typeorm'
import { ManyToOne }     from 'typeorm'

import { SessionEntity } from './session.entity'
import { UserEntity }    from './user.entity'

@Entity()
export class SessionBindingEntity {
  @PrimaryColumn('uuid')
  id!: string

  @Column()
  userId!: string

  @Column()
  sessionId!: string

  @ManyToOne(() => UserEntity)
  users!: Array<UserEntity>

  @ManyToOne(() => SessionEntity, (session) => session.bindings)
  sessions!: Array<SessionEntity>
}
