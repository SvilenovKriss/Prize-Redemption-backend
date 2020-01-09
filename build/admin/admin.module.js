"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const admin_controller_1 = require("./admin.controller");
const admin_service_1 = require("./admin.service");
const typeorm_1 = require("@nestjs/typeorm");
const Outlet_1 = require("../entity/Outlet");
const passport_1 = require("@nestjs/passport");
const Customer_1 = require("../entity/Customer");
const User_1 = require("../entity/User");
const users_controller_1 = require("./users/users.controller");
const users_service_1 = require("./users/users.service");
const customers_service_1 = require("./customers/customers.service");
const customers_controller_1 = require("./customers/customers.controller");
const outlets_service_1 = require("./outlets/outlets.service");
const outlets_controller_1 = require("./outlets/outlets.controller");
const RedemptionRecord_1 = require("../entity/RedemptionRecord");
let AdminModule = class AdminModule {
};
AdminModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([Outlet_1.Outlet, Customer_1.Customer, User_1.User, RedemptionRecord_1.RedemptionRecord]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' })],
        controllers: [admin_controller_1.AdminController, users_controller_1.UsersController, customers_controller_1.CustomersController, outlets_controller_1.OutletsController],
        providers: [admin_service_1.AdminService, users_service_1.UsersService, customers_service_1.CustomersService, outlets_service_1.OutletsService],
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map