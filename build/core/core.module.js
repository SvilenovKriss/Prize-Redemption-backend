"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../entity/User");
const user_service_1 = require("./services/user.service");
const RedemptionCode_1 = require("../entity/RedemptionCode");
const RedemptionRecord_1 = require("../entity/RedemptionRecord");
const Outlet_1 = require("../entity/Outlet");
let CoreModule = class CoreModule {
};
CoreModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([User_1.User, RedemptionCode_1.RedemptionCode, RedemptionRecord_1.RedemptionRecord, Outlet_1.Outlet])],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService],
    })
], CoreModule);
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.module.js.map