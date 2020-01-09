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
const typeorm_1 = require("typeorm");
class ReportQueryDTO {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], ReportQueryDTO.prototype, "userId", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], ReportQueryDTO.prototype, "outletId", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], ReportQueryDTO.prototype, "customerId", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", typeorm_1.Timestamp)
], ReportQueryDTO.prototype, "fromDate", void 0);
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", typeorm_1.Timestamp)
], ReportQueryDTO.prototype, "untilDate", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], ReportQueryDTO.prototype, "prizeId", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], ReportQueryDTO.prototype, "order", void 0);
exports.ReportQueryDTO = ReportQueryDTO;
//# sourceMappingURL=report-query.dto.js.map