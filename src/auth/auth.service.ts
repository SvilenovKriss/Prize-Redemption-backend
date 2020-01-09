import { Injectable, BadRequestException } from '@nestjs/common';
import { LoginDTO } from '../auth/models/login.dto';
import { Repository } from 'typeorm';
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../entity/Customer';
import { LoggedUserDTO } from './models/logged.dto';
import { plainToClass } from 'class-transformer';
import { ValidateEmailDTO } from './models/validateEmail.dto';

@Injectable()
export class AuthService {

    public constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    public async login(body: LoginDTO): Promise<LoggedUserDTO> {
        const checkUser = await this.validateIfEmailExist(body.email);

        const user = await this.userRepo.findOne({
            where: {
                email: body.email,
            },
        });

        const comparePassword = await bcrypt.compare(body.password, user.password);

        if (!comparePassword) {
            throw new BadRequestException('Your password is invalid!');
        }

        const payload = { email: body.email };
        const token = await this.jwtService.signAsync(payload);

        return plainToClass(LoggedUserDTO, { token, ...user }, { excludeExtraneousValues: true });
    }

    public async validateIfEmailExist(email: string): Promise<ValidateEmailDTO> {
        const checkForEmail: any = await this.userRepo.findOne({
            relations: ['outlet', 'redemptionRecords'],
            where: {
                email,
                isDeleted: false,
            },
        });

        if (!checkForEmail) {
            throw new BadRequestException('Your email is invalid!');
        }

        const result = {
            id: checkForEmail.id,
            email: checkForEmail.email,
            username: checkForEmail.username,
            role: checkForEmail.role,
            isDeleted: checkForEmail.isDeleted,
            outlet: checkForEmail.__outlet__,
            redemptionRecords: checkForEmail.__redemptionRecords__,
        };

        return result;
    }
}
