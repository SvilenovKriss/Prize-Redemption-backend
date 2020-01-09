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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Outlet_1 = require("../../entity/Outlet");
const typeorm_2 = require("typeorm");
const Customer_1 = require("../../entity/Customer");
const show_outlet_dto_1 = require("./models/show-outlet.dto");
const class_transformer_1 = require("class-transformer");
let OutletsService = class OutletsService {
    constructor(outletRepo, customerRepo) {
        this.outletRepo = outletRepo;
        this.customerRepo = customerRepo;
    }
    //
    async createNewOutlet(outlet) {
        const checkOutletName = await this.validateIfOutletNameExists(outlet.name);
        if (checkOutletName && outlet.name === checkOutletName.name) {
            throw new common_1.BadRequestException('This outlet name is already beeing used!');
        }
        const outletToAdd = new Outlet_1.Outlet();
        outletToAdd.name = outlet.name;
        const customer = await this.customerRepo.findOne({ id: outlet.customerId });
        outletToAdd.customer = Promise.resolve(customer);
        const savedOutlet = await this.outletRepo.save(outletToAdd);
        return class_transformer_1.plainToClass(show_outlet_dto_1.ShowOutletDTO, Object.assign({}, savedOutlet, { customerId: customer.id, customerName: customer.name }), { excludeExtraneousValues: true });
    }
    //
    async updateOutlet(outletId, outlet) {
        const outletToUpdate = await this.outletRepo.findOne({
            relations: ['customer'],
            where: { id: outletId },
        });
        if (!outletToUpdate) {
            throw new Error('No outlet with that Id exists!');
        }
        const checkOutletName = await this.validateIfOutletNameExists(outlet.name);
        if (checkOutletName && outlet.name === checkOutletName.name) {
            throw new common_1.BadRequestException('This outlet name is already beeing used!');
        }
        outletToUpdate.name = outlet.name;
        const savedOutlet = await this.outletRepo.save(outletToUpdate);
        return class_transformer_1.plainToClass(show_outlet_dto_1.ShowOutletDTO, Object.assign({}, savedOutlet, { customerId: outletToUpdate.__customer__.id, customerName: outletToUpdate.__customer__.name }), { excludeExtraneousValues: true });
    }
    //
    async deleteOutlet(outletId) {
        const outletToDelete = await this.outletRepo.findOne({
            relations: ['customer'],
            where: { id: outletId },
        });
        if (!outletToDelete) {
            throw new Error('No outlet with that Id exists!');
        }
        outletToDelete.isDeleted = true;
        const savedOutlet = await this.outletRepo.save(outletToDelete);
        return class_transformer_1.plainToClass(show_outlet_dto_1.ShowOutletDTO, Object.assign({}, savedOutlet, { customerId: outletToDelete.__customer__.id, customerName: outletToDelete.__customer__.name }), { excludeExtraneousValues: true });
    }
    //
    async changeOutletCustomer(outletId, customerId) {
        const outletToUpdate = await this.outletRepo.findOne({ where: { id: outletId } });
        const customerToUpdate = await this.customerRepo.findOne({ where: { id: customerId } });
        if (!outletToUpdate) {
            throw new common_1.BadRequestException('No outlet with that Id exists!');
        }
        if (!customerToUpdate) {
            throw new common_1.BadRequestException('No customer with that Id exists!');
        }
        outletToUpdate.customer = Promise.resolve(customerToUpdate);
        const savedOutlet = await this.outletRepo.save(outletToUpdate);
        return class_transformer_1.plainToClass(show_outlet_dto_1.ShowOutletDTO, Object.assign({}, savedOutlet, { customerId: customerToUpdate.id, customerName: customerToUpdate.name }), { excludeExtraneousValues: true });
    }
    //
    async validateIfOutletNameExists(name) {
        const checkForName = await this.outletRepo.findOne({
            where: {
                name,
            },
        });
        return checkForName;
    }
    async getOutlets() {
        const outlets = await this.outletRepo.find({
            where: {
                isDeleted: 0,
            },
            relations: ['customer'],
        });
        const transformedOutlets = outlets.map((outlet) => class_transformer_1.plainToClass(show_outlet_dto_1.ShowOutletDTO, Object.assign({}, outlet, { customerId: outlet.__customer__.id, customerName: outlet.__customer__.name }), { excludeExtraneousValues: true }));
        return transformedOutlets;
    }
};
OutletsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(Outlet_1.Outlet)),
    __param(1, typeorm_1.InjectRepository(Customer_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OutletsService);
exports.OutletsService = OutletsService;
//# sourceMappingURL=outlets.service.js.map