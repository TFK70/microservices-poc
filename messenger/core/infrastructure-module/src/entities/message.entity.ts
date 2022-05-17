import { Entity }        from 'typeorm'
import { Column }        from 'typeorm'
import { PrimaryColumn } from 'typeorm'

@Entity()
export class MessageEntity {
  @PrimaryColumn('uuid')
  id!: string

  @Column()
  date!: string

  @Column()
  payload!: string

  @Column()
  senderId!: string

  @Column()
  sessionId!: string
}
