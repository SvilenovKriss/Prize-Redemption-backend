"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line: class-name
class addedPrizeItemType1564084814971 {
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE `redemption_code` DROP COLUMN `itemPrize`');
        await queryRunner.query('ALTER TABLE `redemption_code` ADD `itemPrizeCode` varchar(255) NOT NULL DEFAULT \'\'');
        await queryRunner.query('ALTER TABLE `redemption_code` ADD `itemPrizeType` varchar(255) NOT NULL DEFAULT \'Small\'');
        await queryRunner.query('ALTER TABLE `redemption_record` DROP FOREIGN KEY `FK_33fb55decf7f45fec88c8447ad9`');
        await queryRunner.query('ALTER TABLE `redemption_record` DROP FOREIGN KEY `FK_09ac3fa06caf5deebf00fbe3f13`');
        await queryRunner.query('ALTER TABLE `redemption_record` DROP FOREIGN KEY `FK_d3624dd471e31cd5a9dfc8f97b7`');
        await queryRunner.query('ALTER TABLE `redemption_record` DROP FOREIGN KEY `FK_b9ffc2db1de5a05dfdc5523a598`');
        await queryRunner.query('ALTER TABLE `redemption_record` CHANGE `timeStamp` `timeStamp` timestamp NOT NULL');
        await queryRunner.query('ALTER TABLE `redemption_record` CHANGE `userId` `userId` varchar(36) NULL');
        await queryRunner.query('ALTER TABLE `redemption_record` CHANGE `outletId` `outletId` varchar(36) NULL');
        await queryRunner.query('ALTER TABLE `redemption_record` CHANGE `customerId` `customerId` varchar(36) NULL');
        await queryRunner.query('ALTER TABLE `redemption_record` CHANGE `redemptionCodeId` `redemptionCodeId` varchar(36) NULL');
        await queryRunner.query('ALTER TABLE `user` DROP FOREIGN KEY `FK_3d3b1fbedf229c3994b68a477fe`');
        await queryRunner.query('ALTER TABLE `user` CHANGE `createdOn` `createdOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)');
        await queryRunner.query('ALTER TABLE `user` CHANGE `outletId` `outletId` varchar(36) NULL');
        await queryRunner.query('ALTER TABLE `outlet` DROP FOREIGN KEY `FK_cce20aa27a650db8cfc6db45d58`');
        await queryRunner.query('ALTER TABLE `outlet` CHANGE `customerId` `customerId` varchar(36) NULL');
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('ALTER TABLE `redemption_record` ADD CONSTRAINT `FK_33fb55decf7f45fec88c8447ad9` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('ALTER TABLE `redemption_record` ADD CONSTRAINT `FK_09ac3fa06caf5deebf00fbe3f13` FOREIGN KEY (`outletId`) REFERENCES `outlet`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('ALTER TABLE `redemption_record` ADD CONSTRAINT `FK_d3624dd471e31cd5a9dfc8f97b7` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('ALTER TABLE `redemption_record` ADD CONSTRAINT `FK_b9ffc2db1de5a05dfdc5523a598` FOREIGN KEY (`redemptionCodeId`) REFERENCES `redemption_code`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('ALTER TABLE `user` ADD CONSTRAINT `FK_3d3b1fbedf229c3994b68a477fe` FOREIGN KEY (`outletId`) REFERENCES `outlet`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('ALTER TABLE `outlet` ADD CONSTRAINT `FK_cce20aa27a650db8cfc6db45d58` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE `outlet` DROP FOREIGN KEY `FK_cce20aa27a650db8cfc6db45d58`');
        await queryRunner.query('ALTER TABLE `user` DROP FOREIGN KEY `FK_3d3b1fbedf229c3994b68a477fe`');
        await queryRunner.query('ALTER TABLE `redemption_record` DROP FOREIGN KEY `FK_b9ffc2db1de5a05dfdc5523a598`');
        await queryRunner.query('ALTER TABLE `redemption_record` DROP FOREIGN KEY `FK_d3624dd471e31cd5a9dfc8f97b7`');
        await queryRunner.query('ALTER TABLE `redemption_record` DROP FOREIGN KEY `FK_09ac3fa06caf5deebf00fbe3f13`');
        await queryRunner.query('ALTER TABLE `redemption_record` DROP FOREIGN KEY `FK_33fb55decf7f45fec88c8447ad9`');
        await queryRunner.query('ALTER TABLE `outlet` CHANGE `customerId` `customerId` varchar(36) NULL DEFAULT \'NULL\'');
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('ALTER TABLE `outlet` ADD CONSTRAINT `FK_cce20aa27a650db8cfc6db45d58` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `user` CHANGE `outletId` `outletId` varchar(36) NULL DEFAULT \'NULL\'');
        await queryRunner.query('ALTER TABLE `user` CHANGE `createdOn` `createdOn` datetime(6) NOT NULL DEFAULT \'current_timestamp(6)\'');
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('ALTER TABLE `user` ADD CONSTRAINT `FK_3d3b1fbedf229c3994b68a477fe` FOREIGN KEY (`outletId`) REFERENCES `outlet`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `redemption_record` CHANGE `redemptionCodeId` `redemptionCodeId` varchar(36) NULL DEFAULT \'NULL\'');
        await queryRunner.query('ALTER TABLE `redemption_record` CHANGE `customerId` `customerId` varchar(36) NULL DEFAULT \'NULL\'');
        await queryRunner.query('ALTER TABLE `redemption_record` CHANGE `outletId` `outletId` varchar(36) NULL DEFAULT \'NULL\'');
        await queryRunner.query('ALTER TABLE `redemption_record` CHANGE `userId` `userId` varchar(36) NULL DEFAULT \'NULL\'');
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('ALTER TABLE `redemption_record` CHANGE `timeStamp` `timeStamp` timestamp NOT NULL DEFAULT \'current_timestamp()\' ON UPDATE current_timestamp()');
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('ALTER TABLE `redemption_record` ADD CONSTRAINT `FK_b9ffc2db1de5a05dfdc5523a598` FOREIGN KEY (`redemptionCodeId`) REFERENCES `redemption_code`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('ALTER TABLE `redemption_record` ADD CONSTRAINT `FK_d3624dd471e31cd5a9dfc8f97b7` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('ALTER TABLE `redemption_record` ADD CONSTRAINT `FK_09ac3fa06caf5deebf00fbe3f13` FOREIGN KEY (`outletId`) REFERENCES `outlet`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        // tslint:disable-next-line: max-line-length
        await queryRunner.query('ALTER TABLE `redemption_record` ADD CONSTRAINT `FK_33fb55decf7f45fec88c8447ad9` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `redemption_code` DROP COLUMN `itemPrizeType`');
        await queryRunner.query('ALTER TABLE `redemption_code` DROP COLUMN `itemPrizeCode`');
        await queryRunner.query('ALTER TABLE `redemption_code` ADD `itemPrize` varchar(255) NOT NULL DEFAULT \'\'\'\'');
    }
}
exports.addedPrizeItemType1564084814971 = addedPrizeItemType1564084814971;
//# sourceMappingURL=1564084814971-addedPrizeItemType.js.map