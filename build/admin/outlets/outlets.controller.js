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
const outlet_dto_1 = require("./models/outlet.dto");
const outlets_service_1 = require("./outlets.service");
const update_outlet_dto_1 = require("./models/update-outlet.dto");
const update_outlet_customer_dto_1 = require("./models/update-outlet-customer.dto");
let OutletsController = class OutletsController {
    constructor(outletsService) {
        this.outletsService = outletsService;
    }
    async createOutlet(body) {
        return this.outletsService.createNewOutlet(body);
    }
    async updateOutlet(body, outletId) {
        return this.outletsService.updateOutlet(outletId, body);
    }
    async deleteOutletById(outletId) {
        return await this.outletsService.deleteOutlet(outletId);
    }
    async updateOutletCustomer(body, outletId) {
        return this.outletsService.changeOutletCustomer(outletId, body.customerId);
    }
    async getOutlets() {
        return this.outletsService.getOutlets();
    }
};
__decorate([
    common_1.Post(''),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('Admin'),
    __param(0, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [outlet_dto_1.OutletDTO]),
    __metadata("design:returntype", Promise)
], OutletsController.prototype, "createOutlet", null);
__decorate([
    common_1.Put('/:id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('Admin'),
    __param(0, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: true }))), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_outlet_dto_1.UpdateOutletDTO, String]),
    __metadata("design:returntype", Promise)
], OutletsController.prototype, "updateOutlet", null);
__decorate([
    common_1.Delete('/:id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('Admin'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OutletsController.prototype, "deleteOutletById", null);
__decorate([
    common_1.Put('/:id/customer'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('Admin'),
    __param(0, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: true }))),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_outlet_customer_dto_1.UpdateOutletCustomerDTO, String]),
    __metadata("design:returntype", Promise)
], OutletsController.prototype, "updateOutletCustomer", null);
__decorate([
    common_1.Get(''),
    common_1.UseGuards(passport_1.AuthGuard()),
    roles_decorator_1.Roles('Admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OutletsController.prototype, "getOutlets", null);
OutletsController = __decorate([
    common_1.Controller('outlet'),
    __metadata("design:paramtypes", [outlets_service_1.OutletsService])
], OutletsController);
exports.OutletsController = OutletsController;
//# sourceMappingURL=outlets.controller.js.map