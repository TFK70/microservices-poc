import { Entity }               from 'typeorm'
import { Column }               from 'typeorm'
import { PrimaryColumn }        from 'typeorm'
import { OneToMany }            from 'typeorm'

import { SessionBindingEntity } from './session-binding.entity'

@Entity()
export class SessionEntity {
  @PrimaryColumn('uuid')
  id!: string

  @Column()
  name!: string

  @OneToMany(() => SessionBindingEntity, (binding) => binding.sessions)
  bindings!: Array<SessionBindingEntity>
}
