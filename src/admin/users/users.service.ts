import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Outlet } from '../../entity/Outlet';
import { Repository } from 'typeorm';
import { User } from '../../entity/User';
import { RegisterDTO } from '../../auth/models/register.dto';
import { UpdateUserDTO } from './models/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../../common/UserRole';
import { ShowUserDTO } from './models/show-user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {

  public constructor(
    @InjectRepository(Outlet) private readonly outletRepo: Repository<Outlet>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) { }

  public async createNewUser(user: RegisterDTO): Promise<ShowUserDTO> {

    const checkUserEmailTaken = await this.validateIfEmailExists(user.email);
    const checkUsernameTaken = await this.validateIfUsernameExists(user.username);
    const checkEmailValid = this.validateEmailPattern(user.email);
    const checkPasswordValid = this.validatePasswordPattern(user.password);

    if (!checkEmailValid) {
      throw new BadRequestException('This email is invalid!');
    }

    if (!checkPasswordValid) {
      throw new BadRequestException('This password is invalid!');
    }

    if (checkUserEmailTaken) {
      throw new BadRequestException('This email is already in use by another user!');
    }
    if (checkUsernameTaken) {
      throw new BadRequestException('This username is already taken!');
    }

    const hash = await bcrypt.hash(user.password, 10);
    const createUser = this.userRepo.create(user);
    createUser.password = hash;

    const outlet = await this.outletRepo.findOne({ id: user.outletId });
    createUser.outlet = Promise.resolve(outlet);
    createUser.imageID = '';

    const savedUser = await this.userRepo.save(createUser);
    return plainToClass(
      ShowUserDTO,
      {
        ...savedUser,
        outletId: outlet.id,
        outletName: outlet.name,
      },
      { excludeExtraneousValues: true });
  }

  //

  public async updateUser(userId: string, user: Partial<UpdateUserDTO>): Promise<ShowUserDTO> {

    const checkUserEmail = await this.validateIfEmailExists(user.email);
    const checkUsername = await this.validateIfUsernameExists(user.username);

    if (checkUserEmail && user.email === checkUserEmail.email) {
      throw new BadRequestException('This email is already in use by another user!');
    }
    if (checkUsername && user.username === checkUsername.email) {
      throw new BadRequestException('This username is already taken!');
    }

    const userToUpdate: User = await this.userRepo.findOne(
      {
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

    return plainToClass(
      ShowUserDTO,
      {
        ...savedUser,
        outletId: (userToUpdate as any).__outlet__.id,
        outletName: (userToUpdate as any).__outlet__.name,
      },
      { excludeExtraneousValues: true });
  }

  //

  public async deleteUser(userId: string): Promise<ShowUserDTO> {
    const userToDelete: User = await this.userRepo.findOne(
      {
        relations: ['outlet'],
        where: { id: userId },
      });

    if (!userToDelete) {
      throw new BadRequestException('No user with that Id exists!');
    }

    userToDelete.isDeleted = true;

    const savedUser = await this.userRepo.save(userToDelete);
    return plainToClass(
      ShowUserDTO,
      {
        ...savedUser,
        outletId: (userToDelete as any).__outlet__.id,
        outletName: (userToDelete as any).__outlet__.name,
      },
      { excludeExtraneousValues: true });
  }

  //

  public async updateUserOutlet(userId: string, outletId: string): Promise<ShowUserDTO> {

    const userToUpdate: User = await this.userRepo.findOne({ where: { id: userId } });
    const outletToAddUser: Outlet = await this.outletRepo.findOne({ where: { id: outletId } });

    if (!userToUpdate) {
      throw new BadRequestException('No user with that Id exists!');
    }

    if (!outletToAddUser) {
      throw new BadRequestException('No outlet with that Id exists!');
    }

    userToUpdate.outlet = Promise.resolve(outletToAddUser);

    const savedUser = await this.userRepo.save(userToUpdate);
    return plainToClass(
      ShowUserDTO,
      {
        ...savedUser,
        outletId: outletToAddUser.id,
        outletName: outletToAddUser.name,
      },
      { excludeExtraneousValues: true });
  }

  //

  public async createAdminFromUser(userId: string): Promise<ShowUserDTO> {
    const userToMakeAdmin: User = await this.userRepo.findOne(
      {
        relations: ['outlet'],
        where: { id: userId },
      });

    if (!userToMakeAdmin) {
      throw new BadRequestException('No user with that Id exists!');
    }

    userToMakeAdmin.role = UserRole.Admin;

    const savedUser = await this.userRepo.save(userToMakeAdmin);
    return plainToClass(
      ShowUserDTO,
      {
        ...savedUser,
        outletId: (userToMakeAdmin as any).__outlet__.id,
        outletName: (userToMakeAdmin as any).__outlet__.name,
      },
      { excludeExtraneousValues: true });
  }

  //

  public async validateIfEmailExists(email: string) {
    const checkForEmail = await this.userRepo.findOne({
      where: {
        email,
      },
    });
    return checkForEmail;
  }

  //

  public async validateIfUsernameExists(username: string) {
    const checkForUsername = await this.userRepo.findOne({
      where: {
        username,
      },
    });
    return checkForUsername;
  }

  //

  public async validateEmailPattern(email: string) {
    // tslint:disable-next-line: max-line-length
    const regexp = new RegExp('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');
    return regexp.test(email);
  }

  //

  public async validatePasswordPattern(email: string) {
    const regexp = new RegExp('/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/');
    return regexp.test(email);
  }

}
