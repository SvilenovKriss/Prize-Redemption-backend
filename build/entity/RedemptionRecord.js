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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const RedemptionCode_1 = require("./RedemptionCode");
const User_1 = require("./User");
const Outlet_1 = require("./Outlet");
const status_1 = require("../common/enum/status");
const Customer_1 = require("./Customer");
let RedemptionRecord = class RedemptionRecord {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], RedemptionRecord.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => User_1.User, user => user.redemptionRecords),
    __metadata("design:type", Promise)
], RedemptionRecord.prototype, "user", void 0);
__decorate([
    typeorm_1.Column('timestamp'),
    __metadata("design:type", String)
], RedemptionRecord.prototype, "timeStamp", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], RedemptionRecord.prototype, "status", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Outlet_1.Outlet, outlet => outlet.redemptionRecords),
    __metadata("design:type", Promise)
], RedemptionRecord.prototype, "outlet", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Customer_1.Customer, customer => customer.redemptionRecords),
    __metadata("design:type", Promise)
], RedemptionRecord.prototype, "customer", void 0);
__decorate([
    typeorm_1.ManyToOne(type => RedemptionCode_1.RedemptionCode, code => code.redemptionRecords),
    __metadata("design:type", Promise)
], RedemptionRecord.prototype, "redemptionCode", void 0);
RedemptionRecord = __decorate([
    typeorm_1.Entity()
], RedemptionRecord);
exports.RedemptionRecord = RedemptionRecord;
//# sourceMappingURL=RedemptionRecord.js.map