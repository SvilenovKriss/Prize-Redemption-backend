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
const Outlet_1 = require("./Outlet");
const RedemptionRecord_1 = require("./RedemptionRecord");
let Customer = class Customer {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Customer.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Customer.prototype, "name", void 0);
__decorate([
    typeorm_1.OneToMany(type => Outlet_1.Outlet, outlet => outlet.customer),
    __metadata("design:type", Promise)
], Customer.prototype, "outlets", void 0);
__decorate([
    typeorm_1.OneToMany(type => RedemptionRecord_1.RedemptionRecord, record => record.customer),
    __metadata("design:type", Promise)
], Customer.prototype, "redemptionRecords", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Customer.prototype, "isDeleted", void 0);
Customer = __decorate([
    typeorm_1.Entity()
], Customer);
exports.Customer = Customer;
//# sourceMappingURL=Customer.js.map