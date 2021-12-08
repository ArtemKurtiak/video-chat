import { MigrationInterface, QueryRunner } from 'typeorm';

export class GenderMigrationType1638992800245 implements MigrationInterface {
  name = 'GenderMigrationType1638992800245';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "gender"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "gender" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "gender"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "gender" character varying`,
    );
  }
}
