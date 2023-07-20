import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTodoRelations1689778320903 implements MigrationInterface {
  name = 'AddTodoRelations1689778320903';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todo" ADD "creatorId" integer`);
    await queryRunner.query(`ALTER TABLE "todo" ADD "tagId" integer`);
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "done" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "priority" SET DEFAULT 'medium'`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ADD CONSTRAINT "FK_a4bb15f5b622b108dd0bc9d248d" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ADD CONSTRAINT "FK_1f0bad6dba488eed420ea40fd40" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo" DROP CONSTRAINT "FK_1f0bad6dba488eed420ea40fd40"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" DROP CONSTRAINT "FK_a4bb15f5b622b108dd0bc9d248d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "priority" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "done" DROP DEFAULT`,
    );
    await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "tagId"`);
    await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "creatorId"`);
  }
}
