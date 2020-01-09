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
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const status_1 = require("../../common/enum/status");
const prizeItemType_1 = require("../../common/enum/prizeItemType");
class ShowRedemptionRecordDTO {
}
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.Matches(/^[A-Za-z0-9-]+$/),
    __metadata("design:type", String)
], ShowRedemptionRecordDTO.prototype, "redemptionCode", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ShowRedemptionRecordDTO.prototype, "id", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ShowRedemptionRecordDTO.prototype, "userId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ShowRedemptionRecordDTO.prototype, "username", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ShowRedemptionRecordDTO.prototype, "timeStamp", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ShowRedemptionRecordDTO.prototype, "status", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ShowRedemptionRecordDTO.prototype, "itemPrizeCode", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ShowRedemptionRecordDTO.prototype, "itemPrizeType", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ShowRedemptionRecordDTO.prototype, "outlet", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ShowRedemptionRecordDTO.prototype, "customer", void 0);
exports.ShowRedemptionRecordDTO = ShowRedemptionRecordDTO;
//# sourceMappingURL=show-redemption-record.dto.js.map