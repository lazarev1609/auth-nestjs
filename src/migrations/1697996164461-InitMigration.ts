import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1697996164461 implements MigrationInterface {
    name = 'InitMigration1697996164461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "refreshToken" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_history_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_agent" character varying NOT NULL, "ip_address" character varying NOT NULL, "url" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "PK_86381ccae2bb8185df4111d8e9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_history_entity" ADD CONSTRAINT "FK_06b26ed99a00394e4921ee75ec0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_history_entity" DROP CONSTRAINT "FK_06b26ed99a00394e4921ee75ec0"`);
        await queryRunner.query(`DROP TABLE "user_history_entity"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
