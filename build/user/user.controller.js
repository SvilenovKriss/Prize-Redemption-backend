"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_service_1 = require("../core/services/user.service");
const redemption_record_dto_1 = require("./models/redemption-record.dto");
const passport_1 = require("@nestjs/passport");
const check_code_dto_1 = require("./models/check-code.dto");
const add_prize_code_dto_1 = require("./models/add-prize-code.dto");
const help_desk_dto_1 = require("./models/help-desk.dto");
const platform_express_1 = require("@nestjs/platform-express");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async checkCode(body) {
        return await this.userService.checkForValidCode(body);
    }
    async markCode(req, body) {
        return await this.userService.markCode(body, req.user);
    }
    async getUserActivity(id) {
        return await this.userService.getUserRedemptionRecords(id);
    }
    async reportRedemptionCode(req, body) {
        return this.userService.reportRedemptionCode(body, req.user);
    }
    async addPrizeToRedemptionCode(body) {
        return this.userService.addPrizeToRedemptionCode(body);
    }
    async OutletActivity(id) {
        return await this.userService.getOutletActivity(id);
    }
    async getAllUsers(page) {
        return await this.userService.getAllUsers(page);
    }
    async sendEmail(body) {
        return await this.userService.sendEmail(body);
    }
    async getUserIdByUsername(username) {
        return await this.userService.getUserIdByUsername(username);
    }
    async getUserIdByEmail(email) {
        return await this.userService.getUserIdByEmail(email);
    }
    async getAllEmails() {
        return await this.userService.getAllEmails();
    }
    async getAllUsernames() {
        return await this.userService.getAllUsernames();
    }
    async uploadFile(file, req) {
        return await this.userService.uploadFile(file, req.user);
    }
    async getPicture(res, param) {
        return res.sendFile(param, { root: 'uploads' });
    }
    async getUserByID(id) {
        return await this.userService.getUserByID(id);
    }
};
__decorate([
    common_1.Post('check-code'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_code_dto_1.CheckCodeDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "checkCode", null);
__decorate([
    common_1.Post('mark-code'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Req()),
    __param(1, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, redemption_record_dto_1.RedemptionRecordDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "markCode", null);
__decorate([
    common_1.Get('redemptionRecords/:id'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserActivity", null);
__decorate([
    common_1.Post('report-code'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Req()),
    __param(1, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, check_code_dto_1.CheckCodeDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "reportRedemptionCode", null);
__decorate([
    common_1.Post('add-prize-to-code'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_prize_code_dto_1.AddPrizeToCodeDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addPrizeToRedemptionCode", null);
__decorate([
    common_1.Get('outlet-activity/:id'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "OutletActivity", null);
__decorate([
    common_1.Get(''),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    common_1.Post('help-desk'),
    __param(0, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [help_desk_dto_1.HelpDeskDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "sendEmail", null);
__decorate([
    common_1.Get('/username/:username'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserIdByUsername", null);
__decorate([
    common_1.Get('/email/:email'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserIdByEmail", null);
__decorate([
    common_1.Get('all-emails'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllEmails", null);
__decorate([
    common_1.Get('all-usernames'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsernames", null);
__decorate([
    common_1.Post('upload'),
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('image')),
    __param(0, common_1.UploadedFiles()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadFile", null);
__decorate([
    common_1.Get('image/:image'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Res()), __param(1, common_1.Param('image')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getPicture", null);
__decorate([
    common_1.Get(':id'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByID", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map