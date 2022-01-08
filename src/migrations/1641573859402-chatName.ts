import {MigrationInterface, QueryRunner} from "typeorm";

export class chatName1641573859402 implements MigrationInterface {
    name = 'chatName1641573859402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_chat" DROP CONSTRAINT "FK_e2f3a6eefb26aa957feee2c9dc3"`);
        await queryRunner.query(`ALTER TABLE "user_chat" DROP CONSTRAINT "FK_63f6e1b207375c35588c673843e"`);
        await queryRunner.query(`ALTER TABLE "chat" ADD "name" character varying NOT NULL DEFAULT 'Chat'`);
        await queryRunner.query(`ALTER TABLE "user_chat" ADD CONSTRAINT "FK_e2f3a6eefb26aa957feee2c9dc3" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_chat" ADD CONSTRAINT "FK_63f6e1b207375c35588c673843e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_chat" DROP CONSTRAINT "FK_63f6e1b207375c35588c673843e"`);
        await queryRunner.query(`ALTER TABLE "user_chat" DROP CONSTRAINT "FK_e2f3a6eefb26aa957feee2c9dc3"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user_chat" ADD CONSTRAINT "FK_63f6e1b207375c35588c673843e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_chat" ADD CONSTRAINT "FK_e2f3a6eefb26aa957feee2c9dc3" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
