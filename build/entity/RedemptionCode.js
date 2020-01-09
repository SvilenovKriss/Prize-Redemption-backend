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
const RedemptionRecord_1 = require("./RedemptionRecord");
const prizeItemType_1 = require("../common/enum/prizeItemType");
let RedemptionCode = class RedemptionCode {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], RedemptionCode.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('nvarchar'),
    __metadata("design:type", String)
], RedemptionCode.prototype, "redemptionCode", void 0);
__decorate([
    typeorm_1.Column('nvarchar', { default: '' }),
    __metadata("design:type", String)
], RedemptionCode.prototype, "itemPrizeCode", void 0);
__decorate([
    typeorm_1.Column('nvarchar', { default: 'Small' }),
    __metadata("design:type", String)
], RedemptionCode.prototype, "itemPrizeType", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], RedemptionCode.prototype, "reportedCode", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], RedemptionCode.prototype, "reportedBy", void 0);
__decorate([
    typeorm_1.OneToMany(type => RedemptionRecord_1.RedemptionRecord, redemptionRecord => redemptionRecord.redemptionCode),
    __metadata("design:type", Promise)
], RedemptionCode.prototype, "redemptionRecords", void 0);
RedemptionCode = __decorate([
    typeorm_1.Entity()
], RedemptionCode);
exports.RedemptionCode = RedemptionCode;
//# sourceMappingURL=RedemptionCode.js.map