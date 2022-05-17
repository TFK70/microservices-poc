import { MigrationInterface } from 'typeorm'
import { QueryRunner }        from 'typeorm'

export class CreateTimer1652696688932 implements MigrationInterface {
  name = 'CreateTimer1652696688932'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "timer_entity" ("id" uuid NOT NULL, "code" character varying NOT NULL, "time" integer NOT NULL DEFAULT '0', "isRunning" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_c79cea11347df20a8b78bc6336a" PRIMARY KEY ("id"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "timer_entity"`)
  }
}
