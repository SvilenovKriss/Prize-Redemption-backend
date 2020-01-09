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
const User_1 = require("../../entity/User");
const bcrypt = require("bcrypt");
const UserRole_1 = require("../../common/UserRole");
const show_user_dto_1 = require("./models/show-user.dto");
const class_transformer_1 = require("class-transformer");
let UsersService = class UsersService {
    constructor(outletRepo, userRepo) {
        this.outletRepo = outletRepo;
        this.userRepo = userRepo;
    }
    async createNewUser(user) {
        const checkUserEmailTaken = await this.validateIfEmailExists(user.email);
        const checkUsernameTaken = await this.validateIfUsernameExists(user.username);
        const checkEmailValid = this.validateEmailPattern(user.email);
        const checkPasswordValid = this.validatePasswordPattern(user.password);
        if (!checkEmailValid) {
            throw new common_1.BadRequestException('This email is invalid!');
        }
        if (!checkPasswordValid) {
            throw new common_1.BadRequestException('This password is invalid!');
        }
        if (checkUserEmailTaken) {
            throw new common_1.BadRequestException('This email is already in use by another user!');
        }
        if (checkUsernameTaken) {
            throw new common_1.BadRequestException('This username is already taken!');
        }
        const hash = await bcrypt.hash(user.password, 10);
        const createUser = this.userRepo.create(user);
        createUser.password = hash;
        const outlet = await this.outletRepo.findOne({ id: user.outletId });
        createUser.outlet = Promise.resolve(outlet);
        createUser.imageID = '';
        const savedUser = await this.userRepo.save(createUser);
        return class_transformer_1.plainToClass(show_user_dto_1.ShowUserDTO, Object.assign({}, savedUser, { outletId: outlet.id, outletName: outlet.name }), { excludeExtraneousValues: true });
    }
    //
    async updateUser(userId, user) {
        const checkUserEmail = await this.validateIfEmailExists(user.email);
        const checkUsername = await this.validateIfUsernameExists(user.username);
        if (checkUserEmail && user.email === checkUserEmail.email) {
            throw new common_1.BadRequestException('This email is already in use by another user!');
        }
        if (checkUsername && user.username === checkUsername.email) {
            throw new common_1.BadRequestException('This username is already taken!');
        }
        const userToUpdate = await this.userRepo.findOne({
            relations: ['outlet'],
            where: { id: userId },
        });
        if (user.email) {
            userToUpdate.email = user.email;
        }
        if (user.password) {
            const hash = await bcrypt.hash(user.password, 10);
            userToUpdate.password = hash;
        }
        if (user.username) {
            userToUpdate.username = user.username;
        }
        const savedUser = await this.userRepo.save(userToUpdate);
        return class_transformer_1.plainToClass(show_user_dto_1.ShowUserDTO, Object.assign({}, savedUser, { outletId: userToUpdate.__outlet__.id, outletName: userToUpdate.__outlet__.name }), { excludeExtraneousValues: true });
    }
    //
    async deleteUser(userId) {
        const userToDelete = await this.userRepo.findOne({
            relations: ['outlet'],
            where: { id: userId },
        });
        if (!userToDelete) {
            throw new common_1.BadRequestException('No user with that Id exists!');
        }
        userToDelete.isDeleted = true;
        const savedUser = await this.userRepo.save(userToDelete);
        return class_transformer_1.plainToClass(show_user_dto_1.ShowUserDTO, Object.assign({}, savedUser, { outletId: userToDelete.__outlet__.id, outletName: userToDelete.__outlet__.name }), { excludeExtraneousValues: true });
    }
    //
    async updateUserOutlet(userId, outletId) {
        const userToUpdate = await this.userRepo.findOne({ where: { id: userId } });
        const outletToAddUser = await this.outletRepo.findOne({ where: { id: outletId } });
        if (!userToUpdate) {
            throw new common_1.BadRequestException('No user with that Id exists!');
        }
        if (!outletToAddUser) {
            throw new common_1.BadRequestException('No outlet with that Id exists!');
        }
        userToUpdate.outlet = Promise.resolve(outletToAddUser);
        const savedUser = await this.userRepo.save(userToUpdate);
        return class_transformer_1.plainToClass(show_user_dto_1.ShowUserDTO, Object.assign({}, savedUser, { outletId: outletToAddUser.id, outletName: outletToAddUser.name }), { excludeExtraneousValues: true });
    }
    //
    async createAdminFromUser(userId) {
        const userToMakeAdmin = await this.userRepo.findOne({
            relations: ['outlet'],
            where: { id: userId },
        });
        if (!userToMakeAdmin) {
            throw new common_1.BadRequestException('No user with that Id exists!');
        }
        userToMakeAdmin.role = UserRole_1.UserRole.Admin;
        const savedUser = await this.userRepo.save(userToMakeAdmin);
        return class_transformer_1.plainToClass(show_user_dto_1.ShowUserDTO, Object.assign({}, savedUser, { outletId: userToMakeAdmin.__outlet__.id, outletName: userToMakeAdmin.__outlet__.name }), { excludeExtraneousValues: true });
    }
    //
    async validateIfEmailExists(email) {
        const checkForEmail = await this.userRepo.findOne({
            where: {
                email,
            },
        });
        return checkForEmail;
    }
    //
    async validateIfUsernameExists(username) {
        const checkForUsername = await this.userRepo.findOne({
            where: {
                username,
            },
        });
        return checkForUsername;
    }
    //
    async validateEmailPattern(email) {
        // tslint:disable-next-line: max-line-length
        const regexp = new RegExp('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');
        return regexp.test(email);
    }
    //
    async validatePasswordPattern(email) {
        const regexp = new RegExp('/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/');
        return regexp.test(email);
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(Outlet_1.Outlet)),
    __param(1, typeorm_1.InjectRepository(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map