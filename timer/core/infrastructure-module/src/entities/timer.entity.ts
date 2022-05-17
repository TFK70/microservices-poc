import { Entity }        from 'typeorm'
import { Column }        from 'typeorm'
import { PrimaryColumn } from 'typeorm'

@Entity()
export class TimerEntity {
  @PrimaryColumn('uuid')
  id!: string

  @Column()
  code!: string

  @Column({ default: 0 })
  time!: number

  @Column({ default: false })
  isRunning!: boolean
}
