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
const Customer_1 = require("../../entity/Customer");
const typeorm_2 = require("typeorm");
const customer_dto_1 = require("./models/customer.dto");
const class_transformer_1 = require("class-transformer");
let CustomersService = class CustomersService {
    constructor(customerRepo) {
        this.customerRepo = customerRepo;
    }
    //
    async createNewCustomer(customer) {
        const checkCustomerName = await this.validateIfCustomerNameExists(customer.name);
        if (checkCustomerName) {
            throw new common_1.BadRequestException('This customer name is already beeing used!');
        }
        const customerToAdd = new Customer_1.Customer();
        customerToAdd.name = customer.name;
        const savedCustomer = await this.customerRepo.save(customerToAdd);
        return class_transformer_1.plainToClass(customer_dto_1.CustomerDTO, savedCustomer, { excludeExtraneousValues: true });
    }
    //
    async updateCustomer(customerId, customer) {
        const customerToUpdate = await this.customerRepo.findOne({ where: { id: customerId } });
        if (!customerToUpdate) {
            throw new Error('No customer with that Id exists!');
        }
        const checkCustomerName = await this.validateIfCustomerNameExists(customer.name);
        if (checkCustomerName && customer.name === checkCustomerName.name) {
            throw new common_1.BadRequestException('This customer name is already beeing used!');
        }
        customerToUpdate.name = customer.name;
        const savedCustomer = await this.customerRepo.save(customerToUpdate);
        return class_transformer_1.plainToClass(customer_dto_1.CustomerDTO, savedCustomer, { excludeExtraneousValues: true });
    }
    //
    async getCustomer(customerId) {
        const customerToGet = await this.customerRepo.findOne({ where: { id: customerId } });
        if (!customerToGet) {
            throw new Error('No customer with that Id exists!');
        }
        return class_transformer_1.plainToClass(customer_dto_1.CustomerDTO, customerToGet, { excludeExtraneousValues: true });
    }
    //
    async deleteCustomer(customerId) {
        const customerToDelete = await this.customerRepo.findOne({ where: { id: customerId } });
        if (!customerToDelete) {
            throw new Error('No customer with that Id exists!');
        }
        customerToDelete.isDeleted = true;
        const savedCustomer = await this.customerRepo.save(customerToDelete);
        return class_transformer_1.plainToClass(customer_dto_1.CustomerDTO, savedCustomer, { excludeExtraneousValues: true });
    }
    //
    async validateIfCustomerNameExists(name) {
        const checkForName = await this.customerRepo.findOne({
            where: {
                name,
            },
        });
        return checkForName;
    }
    async getAllCustomers() {
        return await this.customerRepo.find({
            where: {
                isDeleted: 0,
            },
        });
    }
};
CustomersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(Customer_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomersService);
exports.CustomersService = CustomersService;
//# sourceMappingURL=customers.service.js.map