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
const Outlet_1 = require("../entity/Outlet");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const Customer_1 = require("../entity/Customer");
const User_1 = require("../entity/User");
const RedemptionRecord_1 = require("../entity/RedemptionRecord");
const class_transformer_1 = require("class-transformer");
const show_redemption_record_dto_1 = require("../user/models/show-redemption-record.dto");
let AdminService = class AdminService {
    constructor(userRepo, redemptionRecordRepo, outletRepo, customerRepo) {
        this.userRepo = userRepo;
        this.redemptionRecordRepo = redemptionRecordRepo;
        this.outletRepo = outletRepo;
        this.customerRepo = customerRepo;
    }
    async showRecordsByQuery(query) {
        let filteredRecords = null;
        let recordsFirstFilteredBy;
        //
        if (query.userId && !filteredRecords) {
            const foundUser = await this.userRepo.findOne({
                where: {
                    id: query.userId,
                    isDeleted: false,
                },
            });
            if (!foundUser) {
                throw new common_1.BadRequestException('No user with this id exists!');
            }
            filteredRecords = await this.redemptionRecordRepo.find({
                relations: ['redemptionCode', 'user', 'outlet', 'customer'],
                where: {
                    user: foundUser,
                    isDeleted: false,
                },
            });
            recordsFirstFilteredBy = 'user';
        }
        //
        if (query.outletId && !filteredRecords) {
            const foundOutlet = await this.outletRepo.findOne({
                where: {
                    id: query.outletId,
                },
            });
            filteredRecords = await this.redemptionRecordRepo.find({
                relations: ['redemptionCode', 'user', 'outlet', 'customer'],
                where: {
                    outlet: foundOutlet,
                },
            });
            recordsFirstFilteredBy = 'outlet';
        }
        //
        if (query.customerId && !filteredRecords) {
            const foundCustomer = await this.customerRepo.findOne({
                where: {
                    id: query.customerId,
                },
            });
            filteredRecords = await this.redemptionRecordRepo.find({
                relations: ['redemptionCode', 'user', 'outlet', 'customer'],
                where: {
                    customer: foundCustomer,
                },
            });
            recordsFirstFilteredBy = 'customer';
        }
        // check up on later
        // if (query.prizeId && !filteredRecords) {
        //   filteredRecords = await this.redemptionRecordRepo.find({
        //     relations: ['redemptionCode', 'user'],
        //     where: {
        //         itemPrize: query.prizeId,
        //     },
        //   });
        //   recordsFirstFilteredBy = 'prize';
        // }
        // check up on later
        if (query.fromDate && query.untilDate && !filteredRecords) {
            if (query.fromDate > query.untilDate) {
                throw new common_1.BadRequestException('Dates must be in order!');
            }
            filteredRecords = await this.redemptionRecordRepo.find({
                relations: ['redemptionCode', 'user', 'outlet', 'customer'],
                where: {
                    timeStamp: typeorm_1.Between(query.fromDate, query.untilDate),
                },
            });
            recordsFirstFilteredBy = 'date';
        }
        // if (query.userId && recordsFirstFilteredBy !== 'user') {
        //   filteredRecords.filter(record => record.user === query.outletId);
        // }
        if (query.outletId && recordsFirstFilteredBy !== 'outlet') {
            filteredRecords = filteredRecords.filter(async (record) => (await record.outlet).id === query.outletId);
        }
        if (query.customerId && recordsFirstFilteredBy !== 'customer') {
            filteredRecords = filteredRecords.filter(async (record) => (await record.customer).id === query.customerId);
        }
        if (query.fromDate && query.untilDate && recordsFirstFilteredBy !== 'date') {
            filteredRecords = filteredRecords.filter(record => ((new Date(record.timeStamp) >= new Date(query.fromDate.toString()))
                &&
                    (new Date(record.timeStamp) <= new Date(query.untilDate.toString()))));
        }
        const transformedAndFilteredRecords = filteredRecords.map((record) => class_transformer_1.plainToClass(show_redemption_record_dto_1.ShowRedemptionRecordDTO, Object.assign({}, record, { redemptionCode: record.__redemptionCode__.redemptionCode, userId: record.__user__.id, username: record.__user__.username, outlet: record.__outlet__.name, customer: record.__customer__.name }), { excludeExtraneousValues: true }));
        return transformedAndFilteredRecords;
    }
};
AdminService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(User_1.User)),
    __param(1, typeorm_2.InjectRepository(RedemptionRecord_1.RedemptionRecord)),
    __param(2, typeorm_2.InjectRepository(Outlet_1.Outlet)),
    __param(3, typeorm_2.InjectRepository(Customer_1.Customer)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map