"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const typeorm_1 = require("@nestjs/typeorm");
const RedemptionCode_1 = require("../entity/RedemptionCode");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const config_module_1 = require("../config/config.module");
const config_service_1 = require("../config/config.service");
const RedemptionRecord_1 = require("../entity/RedemptionRecord");
const Outlet_1 = require("../entity/Outlet");
const core_module_1 = require("../core/core.module");
const platform_express_1 = require("@nestjs/platform-express");
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        imports: [core_module_1.CoreModule, typeorm_1.TypeOrmModule.forFeature([RedemptionCode_1.RedemptionCode, RedemptionRecord_1.RedemptionRecord, Outlet_1.Outlet]), passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_module_1.ConfigModule],
                inject: [config_service_1.ConfigService],
                useFactory: async (configService) => ({
                    secretOrPrivateKey: configService.jwtSecret,
                    signOptions: {
                        expiresIn: configService.jwtExpireTime,
                    },
                }),
            }),
            platform_express_1.MulterModule.registerAsync({
                useFactory: () => ({
                    dest: './uploads'
                }),
            })],
        controllers: [user_controller_1.UserController],
        providers: [],
        exports: [],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map