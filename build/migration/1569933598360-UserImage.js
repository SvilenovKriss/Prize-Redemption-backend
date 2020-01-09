"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserImage1569933598360 {
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE `user` ADD `imageID` varchar(255) NOT NULL');
        await queryRunner.query('ALTER TABLE `redemption_record` CHANGE `timeStamp` `timeStamp` timestamp NOT NULL');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE `redemption_record` CHANGE `timeStamp` `timeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');
        await queryRunner.query('ALTER TABLE `user` DROP COLUMN `imageID`');
    }
}
exports.UserImage1569933598360 = UserImage1569933598360;
//# sourceMappingURL=1569933598360-UserImage.js.map