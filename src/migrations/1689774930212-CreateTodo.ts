import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTodo1689774930212 implements MigrationInterface {
  name = 'CreateTodo1689774930212';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "todo" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "done" boolean NOT NULL, "priority" character varying NOT NULL, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "todo"`);
  }
}
