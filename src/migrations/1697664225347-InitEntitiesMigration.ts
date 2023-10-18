import { MigrationInterface, QueryRunner } from "typeorm";

export class InitEntitiesMigration1697664225347 implements MigrationInterface {
    name = 'InitEntitiesMigration1697664225347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP, "rolesId" uuid, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_history_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_agent" character varying NOT NULL, "ip_address" character varying NOT NULL, "url" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "PK_86381ccae2bb8185df4111d8e9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_5493e241ab6c27f36c7f9bae51a" FOREIGN KEY ("rolesId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "FK_3e02d32dd4707c91433de0390ea" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_history_entity" ADD CONSTRAINT "FK_06b26ed99a00394e4921ee75ec0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_history_entity" DROP CONSTRAINT "FK_06b26ed99a00394e4921ee75ec0"`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_3e02d32dd4707c91433de0390ea"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_5493e241ab6c27f36c7f9bae51a"`);
        await queryRunner.query(`DROP TABLE "user_history_entity"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
