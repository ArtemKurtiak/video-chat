import { MigrationInterface, QueryRunner } from 'typeorm';

export class Notification1638993216573 implements MigrationInterface {
  name = 'Notification1638993216573';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "notification" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "notification"`);
  }
}
