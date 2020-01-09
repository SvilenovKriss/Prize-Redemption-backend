"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const auth_module_1 = require("./auth/auth.module");
const config_module_1 = require("./config/config.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_service_1 = require("./config/config.service");
const user_module_1 = require("./user/user.module");
const core_module_1 = require("./core/core.module");
const admin_module_1 = require("./admin/admin.module");
const Customer_1 = require("./entity/Customer");
const User_1 = require("./entity/User");
const Outlet_1 = require("./entity/Outlet");
const RedemptionCode_1 = require("./entity/RedemptionCode");
const RedemptionRecord_1 = require("./entity/RedemptionRecord");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            auth_module_1.AuthModule,
            config_module_1.ConfigModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_module_1.ConfigModule],
                inject: [config_service_1.ConfigService],
                useFactory: async (configService) => ({
                    type: configService.dbType,
                    host: configService.dbHost,
                    port: configService.dbPort,
                    username: configService.dbUsername,
                    password: configService.dbPassword,
                    database: configService.dbName,
                    entities: [Customer_1.Customer, User_1.User, Outlet_1.Outlet, RedemptionCode_1.RedemptionCode, RedemptionRecord_1.RedemptionRecord],
                }),
            }),
            user_module_1.UserModule,
            core_module_1.CoreModule,
            admin_module_1.AdminModule,
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map