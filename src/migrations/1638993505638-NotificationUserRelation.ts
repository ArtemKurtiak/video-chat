import {MigrationInterface, QueryRunner} from "typeorm";

export class NotificationUserRelation1638993505638 implements MigrationInterface {
    name = 'NotificationUserRelation1638993505638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "gender" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "gender" integer`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "userId"`);
    }

}
