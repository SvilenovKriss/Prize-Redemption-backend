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
const logged_dto_1 = require("./../../auth/models/logged.dto");
const common_1 = require("@nestjs/common");
const redemption_record_dto_1 = require("../../user/models/redemption-record.dto");
const RedemptionCode_1 = require("../../entity/RedemptionCode");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const RedemptionRecord_1 = require("../../entity/RedemptionRecord");
const User_1 = require("../../entity/User");
const status_1 = require("../../common/enum/status");
const class_transformer_1 = require("class-transformer");
const users_dto_1 = require("../../user/models/users.dto");
const Outlet_1 = require("../../entity/Outlet");
const activity_dto_1 = require("../../user/models/activity.dto");
const nodemailer = require("nodemailer");
const outlet_activity_dto_1 = require("../../user/models/outlet-activity.dto");
const email_dto_1 = require("../../user/models/email.dto");
const username_dto_1 = require("../../user/models/username.dto");
let UserService = class UserService {
    constructor(redemptionCodeRepo, redemptionRecordRepo, outletRepo, userRepo) {
        this.redemptionCodeRepo = redemptionCodeRepo;
        this.redemptionRecordRepo = redemptionRecordRepo;
        this.outletRepo = outletRepo;
        this.userRepo = userRepo;
    }
    async getAllUsers(page) {
        const findUsers = await this.userRepo.find({
            where: {
                isDeleted: 0,
            },
            relations: ['outlet'],
            take: 10,
            skip: 10 * (page - 1),
        });
        const getUsers = findUsers.map(x => {
            x.__outlet__ = x.__outlet__.name;
            return x;
        });
        return class_transformer_1.plainToClass(users_dto_1.UsersDTO, getUsers, { excludeExtraneousValues: true });
    }
    async getUserByID(id) {
        const user = await this.userRepo.findOne({
            where: {
                id,
                isDeleted: 0,
            },
            relations: ['outlet'],
        });
        if (!user) {
            throw new common_1.BadRequestException('There is no user with this ID');
        }
        const outletName = user.__outlet__.name;
        // tslint:disable-next-line: no-string-literal
        delete user['__outlet__'];
        const userToReturn = Object.assign({}, user, { outletName });
        return class_transformer_1.plainToClass(logged_dto_1.LoggedUserDTO, userToReturn, { excludeExtraneousValues: true });
    }
    async getUserIdByUsername(username) {
        const user = await this.userRepo.findOne({
            where: {
                username,
                isDeleted: 0,
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('There is no user with this username!');
        }
        return { userId: user.id };
    }
    async getUserIdByEmail(email) {
        const user = await this.userRepo.findOne({
            where: {
                email,
                isDeleted: 0,
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('There is no user with this email!');
        }
        return { userId: user.id };
    }
    async checkForValidCode(code) {
        const redemptionCode = await this.checkIfCodeIsValid(code.redemptionCode);
        if (!redemptionCode) {
            throw new common_1.BadRequestException(`Sorry, your code is invalid!`);
        }
        if (redemptionCode.reportedCode) {
            throw new common_1.BadRequestException(`Sorry, your code has been reported!`);
        }
        let redemptionRecordExist = await this.redemptionRecordRepo.find({
            relations: ['outlet', 'customer'],
            where: {
                redemptionCode,
            },
        });
        // tslint:disable-next-line: max-line-length
        redemptionRecordExist = redemptionRecordExist.filter(x => ((x.status === status_1.Status.Redeemed) || (x.status === status_1.Status.Declined))); // checks if status is already redeemed
        if (redemptionRecordExist.length) {
            return redemptionRecordExist;
        }
        return redemptionCode;
    }
    async markCode(code, me) {
        const redemptionCode = await this.checkIfCodeIsValid(code.redemptionCode);
        if (!redemptionCode) {
            throw new common_1.BadRequestException('Invalid code!');
        }
        const redemptionRecords = await redemptionCode.redemptionRecords;
        const checkIfCodeIsRedeemed = redemptionRecords.filter(x => x.status === status_1.Status.Redeemed);
        if (checkIfCodeIsRedeemed.length) {
            code.status = status_1.Status.Declined;
        }
        const setRecord = new RedemptionRecord_1.RedemptionRecord();
        setRecord.outlet = Promise.resolve(me.outlet);
        setRecord.status = code.status;
        const foundOutlet = await this.outletRepo.findOne({
            relations: ['customer'],
            where: {
                id: me.outlet.id,
            },
        });
        setRecord.customer = Promise.resolve(foundOutlet.__customer__);
        setRecord.redemptionCode = Promise.resolve(redemptionCode);
        setRecord.user = Promise.resolve(me);
        await this.redemptionRecordRepo.save(setRecord);
        return class_transformer_1.plainToClass(redemption_record_dto_1.RedemptionRecordDTO, {
            redemptionCode: redemptionCode.redemptionCode,
            status: code.status,
            itemPrizeType: redemptionCode.itemPrizeType,
        }, { excludeExtraneousValues: true });
    }
    async addPrizeToRedemptionCode(code) {
        const findCode = await this.redemptionCodeRepo.findOne({
            where: {
                redemptionCode: code.redemptionCode,
            },
        });
        findCode.itemPrizeCode = code.itemPrizeCode;
        await this.redemptionCodeRepo.save(findCode);
        return { message: 'success' };
    }
    async checkIfCodeIsValid(code) {
        return await this.redemptionCodeRepo.findOne({
            where: {
                redemptionCode: code,
            },
        });
    }
    async reportRedemptionCode(code, me) {
        const findCode = await this.redemptionCodeRepo.findOne({
            where: {
                redemptionCode: code.redemptionCode,
            },
        });
        findCode.reportedCode = true;
        findCode.reportedBy = me.username;
        await this.redemptionCodeRepo.save(findCode);
        return { message: 'success' };
    }
    async getUserRedemptionRecords(id) {
        const myRecords = await this.redemptionRecordRepo.find({
            where: {
                user: id,
            },
            relations: ['redemptionCode', 'outlet'],
        });
        const records = myRecords.map(x => {
            x.__redemptionCode__ = x.__redemptionCode__.redemptionCode;
            x.__outlet__ = x.__outlet__.name;
            x.timeStamp = x.timeStamp;
            return x;
        });
        return class_transformer_1.plainToClass(activity_dto_1.ActivityDTO, records, { excludeExtraneousValues: true });
    }
    async sendEmail(body) {
        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS,
            },
        });
        const message = {
            from: 'kriss.svilenov@gmail.com',
            to: 'alen41295@abv.bg',
            subject: body.subject,
            text: body.description,
        };
        await transporter.sendMail(message, (error, info) => {
            if (error) {
                throw new common_1.NotAcceptableException('This request is not accepted');
            }
        });
        return { message: 'Success!' };
    }
    async getOutletActivity(id) {
        const user = await this.userRepo.findOne({
            where: {
                id,
            },
            relations: ['outlet'],
        });
        const findRecordsForTheOutlet = await this.redemptionRecordRepo.find({
            where: {
                outlet: user.__outlet__.id,
            },
            relations: ['user', 'outlet', 'redemptionCode'],
        });
        const recordForMyOutlet = findRecordsForTheOutlet
            .map(x => {
            x.user = x.__user__.username;
            x.redemptionCode = x.__redemptionCode__.redemptionCode;
            x.outlet = x.__outlet__.name;
            return x;
        });
        return class_transformer_1.plainToClass(outlet_activity_dto_1.OutletActivityDTO, recordForMyOutlet, { excludeExtraneousValues: true });
    }
    async getAllEmails() {
        const emails = await this.userRepo.find();
        return class_transformer_1.plainToClass(email_dto_1.EmailDTO, emails, { excludeExtraneousValues: true });
    }
    async getAllUsernames() {
        const usernames = await this.userRepo.find();
        return class_transformer_1.plainToClass(username_dto_1.UsernameDTO, usernames, { excludeExtraneousValues: true });
    }
    async uploadFile(file, user) {
        const changeUserPic = await this.userRepo.findOne({
            where: {
                id: user.id
            }
        });
        changeUserPic.imageID = file[0].filename;
        return await this.userRepo.save(changeUserPic);
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(RedemptionCode_1.RedemptionCode)),
    __param(1, typeorm_1.InjectRepository(RedemptionRecord_1.RedemptionRecord)),
    __param(2, typeorm_1.InjectRepository(Outlet_1.Outlet)),
    __param(3, typeorm_1.InjectRepository(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map