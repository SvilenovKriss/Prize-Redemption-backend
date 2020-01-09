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
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../../guards/roles.guard");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const users_service_1 = require("./users.service");
const update_user_outlet_dto_1 = require("./models/update-user-outlet.dto");
const register_dto_1 = require("../../auth/models/register.dto");
// add return types and DTOs for all http requests
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async createUser(body) {
        return this.usersService.createNewUser(body);
    }
    async updateUser(body, userId) {
        return this.usersService.updateUser(userId, body);
    }
    async deleteUserById(userId) {
        return await this.usersService.deleteUser(userId);
    }
    async updateUserOutlet(body, userId) {
        return this.usersService.updateUserOutlet(userId, body.outletId);
    }
    async makeUserAdmin(userId) {
        return await this.usersService.createAdminFromUser(userId);
    }
};
__decorate([
    common_1.Post('/create'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('Admin'),
    __param(0, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    common_1.Put('/:id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('Admin'),
    __param(0, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: false }))),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    common_1.Delete('/:id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('Admin'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUserById", null);
__decorate([
    common_1.Put('/:id/outlet'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('Admin'),
    __param(0, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: true }))),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_outlet_dto_1.UpdateUserOutletDTO, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserOutlet", null);
__decorate([
    common_1.Put('/:id/role'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('Admin'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "makeUserAdmin", null);
UsersController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map