import {MigrationInterface, QueryRunner} from "typeorm";

export class MessageRelations1639326982892 implements MigrationInterface {
    name = 'MessageRelations1639326982892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "from"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "from" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "to"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "to" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "to"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "to" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "from"`);
        await queryRunner.query(`ALTER TABLE "message" ADD "from" character varying NOT NULL`);
    }

}
