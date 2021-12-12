import {MigrationInterface, QueryRunner} from "typeorm";

export class MessageEntity1639326184636 implements MigrationInterface {
    name = 'MessageEntity1639326184636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "from" character varying NOT NULL, "to" character varying NOT NULL, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "message"`);
    }

}
