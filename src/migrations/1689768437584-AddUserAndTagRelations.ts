import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserAndTagRelations1689768437584 implements MigrationInterface {
  name = 'AddUserAndTagRelations1689768437584';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tags" ADD "creatorId" integer`);
    await queryRunner.query(
      `ALTER TABLE "tags" ADD CONSTRAINT "FK_2e4d4772ece57ca55037ebaacc3" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tags" DROP CONSTRAINT "FK_2e4d4772ece57ca55037ebaacc3"`,
    );
    await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "creatorId"`);
  }
}
