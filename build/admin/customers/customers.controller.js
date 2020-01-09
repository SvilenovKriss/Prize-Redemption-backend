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
const customer_dto_1 = require("./models/customer.dto");
const customers_service_1 = require("./customers.service");
let CustomersController = class CustomersController {
    constructor(customersService) {
        this.customersService = customersService;
    }
    async createCustomer(body) {
        return this.customersService.createNewCustomer(body);
    }
    async updateCustomer(body, userId) {
        return this.customersService.updateCustomer(userId, body);
    }
    async getCustomerById(customerId) {
        return await this.customersService.getCustomer(customerId);
    }
    async deleteCustomerById(customerId) {
        return await this.customersService.deleteCustomer(customerId);
    }
    async getCustomers() {
        return await this.customersService.getAllCustomers();
    }
};
__decorate([
    common_1.Post(''),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('Admin'),
    __param(0, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_dto_1.CustomerDTO]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "createCustomer", null);
__decorate([
    common_1.Put('/:id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('Admin'),
    __param(0, common_1.Body(new common_1.ValidationPipe({ transform: true, whitelist: true }))), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_dto_1.CustomerDTO, String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "updateCustomer", null);
__decorate([
    common_1.Get('/:id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('Admin'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "getCustomerById", null);
__decorate([
    common_1.Delete('/:id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('Admin'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "deleteCustomerById", null);
__decorate([
    common_1.Get(''),
    common_1.UseGuards(passport_1.AuthGuard()),
    roles_decorator_1.Roles('Admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "getCustomers", null);
CustomersController = __decorate([
    common_1.Controller('customer'),
    __metadata("design:paramtypes", [customers_service_1.CustomersService])
], CustomersController);
exports.CustomersController = CustomersController;
//# sourceMappingURL=customers.controller.js.map