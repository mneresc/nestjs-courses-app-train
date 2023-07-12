/**
 * @TODO ajustar migrations
 */
import { MigrationInterface, QueryRunner } from "typeorm"

export class CourseRefactory1689159730965 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" RENAME COLUMN "name" TO "title"`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" RENAME COLUMN "title" TO "name"`)
    }

}
