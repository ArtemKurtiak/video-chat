import {MigrationInterface, QueryRunner} from "typeorm";

export class GenderFieldNullable1638915589451 implements MigrationInterface {
    name = 'GenderFieldNullable1638915589451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "gender" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "gender"`);
    }

}
