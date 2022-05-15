import { MigrationInterface }              from 'typeorm'

import { QueryRunner } from 'typeorm'

export class CreateMainEntities1652646399856 implements MigrationInterface {
  name = 'CreateMainEntities1652646399856'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "message_entity" ("id" uuid NOT NULL, "date" character varying NOT NULL, "payload" character varying NOT NULL, "senderId" character varying NOT NULL, "sessionId" character varying NOT NULL, CONSTRAINT "PK_45bb3707fbb99a73e831fee41e0" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("id" uuid NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "session_binding_entity" ("id" uuid NOT NULL, "userId" character varying NOT NULL, "sessionId" character varying NOT NULL, "usersId" uuid, "sessionsId" uuid, CONSTRAINT "PK_ba9815125390aae5e4d343b73f8" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "session_entity" ("id" uuid NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_897bc09b92e1a7ef6b30cba4786" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "session_binding_entity" ADD CONSTRAINT "FK_0da216dcad3f80e4c87387806cc" FOREIGN KEY ("usersId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "session_binding_entity" ADD CONSTRAINT "FK_94a3934270b1adadc000f8ded47" FOREIGN KEY ("sessionsId") REFERENCES "session_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "session_binding_entity" DROP CONSTRAINT "FK_94a3934270b1adadc000f8ded47"`
    )
    await queryRunner.query(
      `ALTER TABLE "session_binding_entity" DROP CONSTRAINT "FK_0da216dcad3f80e4c87387806cc"`
    )
    await queryRunner.query(`DROP TABLE "session_entity"`)
    await queryRunner.query(`DROP TABLE "session_binding_entity"`)
    await queryRunner.query(`DROP TABLE "user_entity"`)
    await queryRunner.query(`DROP TABLE "message_entity"`)
  }
}
