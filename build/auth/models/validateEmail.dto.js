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
const class_transformer_1 = require("class-transformer");
const UserRole_1 = require("../../common/UserRole");
const Outlet_1 = require("../../entity/Outlet");
class ValidateEmailDTO {
}
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ValidateEmailDTO.prototype, "id", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ValidateEmailDTO.prototype, "email", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ValidateEmailDTO.prototype, "username", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], ValidateEmailDTO.prototype, "role", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Outlet_1.Outlet)
], ValidateEmailDTO.prototype, "outlet", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Boolean)
], ValidateEmailDTO.prototype, "isDeleted", void 0);
exports.ValidateEmailDTO = ValidateEmailDTO;
//# sourceMappingURL=validateEmail.dto.js.map