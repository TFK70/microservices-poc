import { Entity }        from 'typeorm'
import { Column }        from 'typeorm'
import { PrimaryColumn } from 'typeorm'

@Entity()
export class UserEntity {
  @PrimaryColumn('uuid')
  id!: string

  @Column()
  name!: string
}
