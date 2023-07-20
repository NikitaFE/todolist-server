import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTodoIndex1689798421993 implements MigrationInterface {
  name = 'AddTodoIndex1689798421993';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo" DROP CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ADD CONSTRAINT "PK_3d2443bf84e2dfb4c9bc3f58749" PRIMARY KEY ("id", "index")`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "todo_index_seq" OWNED BY "todo"."index"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "index" SET DEFAULT nextval('"todo_index_seq"')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "index" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "todo_index_seq"`);
    await queryRunner.query(
      `ALTER TABLE "todo" DROP CONSTRAINT "PK_3d2443bf84e2dfb4c9bc3f58749"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ADD CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id")`,
    );
  }
}
