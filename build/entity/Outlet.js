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
const Customer_1 = require("./Customer");
const User_1 = require("./User");
const RedemptionRecord_1 = require("./RedemptionRecord");
let Outlet = class Outlet {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Outlet.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Outlet.prototype, "name", void 0);
__decorate([
    typeorm_1.OneToMany(type => User_1.User, user => user.outlet),
    __metadata("design:type", Promise)
], Outlet.prototype, "users", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Customer_1.Customer, customer => customer.outlets),
    __metadata("design:type", Promise)
], Outlet.prototype, "customer", void 0);
__decorate([
    typeorm_1.OneToMany(type => RedemptionRecord_1.RedemptionRecord, record => record.outlet),
    __metadata("design:type", Promise)
], Outlet.prototype, "redemptionRecords", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Outlet.prototype, "isDeleted", void 0);
Outlet = __decorate([
    typeorm_1.Entity()
], Outlet);
exports.Outlet = Outlet;
//# sourceMappingURL=Outlet.js.map