import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserImage1569933598360 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `user` ADD `imageID` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `redemption_record` CHANGE `timeStamp` `timeStamp` timestamp NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `redemption_record` CHANGE `timeStamp` `timeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');
        await queryRunner.query('ALTER TABLE `user` DROP COLUMN `imageID`');
    }

}
