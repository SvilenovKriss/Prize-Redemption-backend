import {MigrationInterface, QueryRunner} from 'typeorm';

// tslint:disable-next-line: class-name
export class initial1562511491520 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('CREATE TABLE `redemption_code` (`id` varchar(36) NOT NULL, `redemptionCode` varchar(255) NOT NULL, `reportedCode` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('CREATE TABLE `redemption_record` (`id` varchar(36) NOT NULL, `timeStamp` timestamp NOT NULL, `status` varchar(255) NOT NULL, `itemPrize` varchar(255) NOT NULL DEFAULT \'\', `outlet` varchar(255) NOT NULL, `customer` varchar(255) NOT NULL, `userId` varchar(36) NULL, `redemptionCodeId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('CREATE TABLE `user` (`id` varchar(36) NOT NULL, `email` varchar(255) NOT NULL, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role` varchar(255) NOT NULL DEFAULT \'StandartUser\', `isDeleted` tinyint NOT NULL DEFAULT 0, `outletId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('CREATE TABLE `outlet` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `isDeleted` tinyint NOT NULL DEFAULT 0, `customerId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('CREATE TABLE `customer` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `isDeleted` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('ALTER TABLE `redemption_record` ADD CONSTRAINT `FK_33fb55decf7f45fec88c8447ad9` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('ALTER TABLE `redemption_record` ADD CONSTRAINT `FK_b9ffc2db1de5a05dfdc5523a598` FOREIGN KEY (`redemptionCodeId`) REFERENCES `redemption_code`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('ALTER TABLE `user` ADD CONSTRAINT `FK_3d3b1fbedf229c3994b68a477fe` FOREIGN KEY (`outletId`) REFERENCES `outlet`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('ALTER TABLE `outlet` ADD CONSTRAINT `FK_cce20aa27a650db8cfc6db45d58` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `outlet` DROP FOREIGN KEY `FK_cce20aa27a650db8cfc6db45d58`');
        await queryRunner.query('ALTER TABLE `user` DROP FOREIGN KEY `FK_3d3b1fbedf229c3994b68a477fe`');
        await queryRunner.query('ALTER TABLE `redemption_record` DROP FOREIGN KEY `FK_b9ffc2db1de5a05dfdc5523a598`');
        await queryRunner.query('ALTER TABLE `redemption_record` DROP FOREIGN KEY `FK_33fb55decf7f45fec88c8447ad9`');
        await queryRunner.query('DROP TABLE `customer`');
        await queryRunner.query('DROP TABLE `outlet`');
        await queryRunner.query('DROP TABLE `user`');
        await queryRunner.query('DROP TABLE `redemption_record`');
        await queryRunner.query('DROP TABLE `redemption_code`');
    }

}
