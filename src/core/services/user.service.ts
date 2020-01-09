import { LoggedUserDTO } from './../../auth/models/logged.dto';
import { Injectable, BadRequestException, NotAcceptableException } from '@nestjs/common';
import { RedemptionRecordDTO } from '../../user/models/redemption-record.dto';
import { RedemptionCode } from '../../entity/RedemptionCode';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Code } from 'typeorm';
import { RedemptionRecord } from '../../entity/RedemptionRecord';
import { User } from '../../entity/User';
import { Status } from '../../common/enum/status';
import { CheckCodeDTO } from '../../user/models/check-code.dto';
import { ShowMessageDTO } from '../../user/models/show-message.dto';
import { AddPrizeToCodeDTO } from '../../user/models/add-prize-code.dto';
import { plainToClass } from 'class-transformer';
import { UsersDTO } from '../../user/models/users.dto';
import { ShowUserIdDTO } from '../../user/models/show-user-id.dto';
import { Customer } from '../../entity/Customer';
import { Outlet } from '../../entity/Outlet';
import { ActivityDTO } from '../../user/models/activity.dto';
import { HelpDeskDTO } from '../../user/models/help-desk.dto';
import * as nodemailer from 'nodemailer';
import { OutletActivityDTO } from '../../user/models/outlet-activity.dto';
import { EmailDTO } from '../../user/models/email.dto';
import { UsernameDTO } from '../../user/models/username.dto';
@Injectable()
export class UserService {

  public constructor(
    @InjectRepository(RedemptionCode) private readonly redemptionCodeRepo: Repository<RedemptionCode>,
    @InjectRepository(RedemptionRecord) private readonly redemptionRecordRepo: Repository<RedemptionRecord>,
    @InjectRepository(Outlet) private readonly outletRepo: Repository<Outlet>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) { }

  public async getAllUsers(page: number): Promise<UsersDTO> {
    const findUsers: any = await this.userRepo.find(
      {
        where: {
          isDeleted: 0,
        },
        relations: ['outlet'],
        take: 10,
        skip: 10 * (page - 1),
      },
    );

    const getUsers = findUsers.map(x => {
      x.__outlet__ = x.__outlet__.name;
      return x;
    });
    return plainToClass(UsersDTO, getUsers, { excludeExtraneousValues: true });
  }

  public async getUserByID(id: string): Promise<LoggedUserDTO> {
    const user: any = await this.userRepo.findOne({
      where: {
        id,
        isDeleted: 0,
      },
      relations: ['outlet'],
    });

    if (!user) {
      throw new BadRequestException('There is no user with this ID');
    }
    const outletName = user.__outlet__.name;
    // tslint:disable-next-line: no-string-literal
    delete user['__outlet__'];
    const userToReturn = { ...user, outletName };

    return plainToClass(LoggedUserDTO, userToReturn, { excludeExtraneousValues: true });
  }

  public async getUserIdByUsername(username: string): Promise<ShowUserIdDTO> {
    const user: any = await this.userRepo.findOne({
      where: {
        username,
        isDeleted: 0,
      },
    });

    if (!user) {
      throw new BadRequestException('There is no user with this username!');
    }

    return { userId: user.id };
  }

  public async getUserIdByEmail(email: string): Promise<ShowUserIdDTO> {
    const user: any = await this.userRepo.findOne({
      where: {
        email,
        isDeleted: 0,
      },
    });

    if (!user) {
      throw new BadRequestException('There is no user with this email!');
    }

    return { userId: user.id };
  }

  public async checkForValidCode(code: CheckCodeDTO): Promise<RedemptionCode | RedemptionRecord[]> {
    const redemptionCode = await this.checkIfCodeIsValid(code.redemptionCode);
    if (!redemptionCode) {
      throw new BadRequestException(`Sorry, your code is invalid!`);
    }

    if (redemptionCode.reportedCode) {
      throw new BadRequestException(`Sorry, your code has been reported!`);
    }

    let redemptionRecordExist = await this.redemptionRecordRepo.find({
      relations: ['outlet', 'customer'],
      where: {
        redemptionCode,
      },
    });

    // tslint:disable-next-line: max-line-length
    redemptionRecordExist = redemptionRecordExist.filter(x => ((x.status === Status.Redeemed) || (x.status === Status.Declined))); // checks if status is already redeemed
    if (redemptionRecordExist.length) {
      return redemptionRecordExist;
    }

    return redemptionCode;
  }

  public async markCode(code: RedemptionRecordDTO, me: User): Promise<RedemptionRecordDTO> {
    const redemptionCode = await this.checkIfCodeIsValid(code.redemptionCode);

    if (!redemptionCode) {
      throw new BadRequestException('Invalid code!');
    }

    const redemptionRecords = await redemptionCode.redemptionRecords;
    const checkIfCodeIsRedeemed = redemptionRecords.filter(x => x.status === Status.Redeemed);

    if (checkIfCodeIsRedeemed.length) {
      code.status = Status.Declined;
    }

    const setRecord = new RedemptionRecord();
    setRecord.outlet = Promise.resolve(me.outlet);
    setRecord.status = code.status;

    const foundOutlet = await this.outletRepo.findOne({
      relations: ['customer'],
      where: {
        id: (me.outlet as any).id,
      },
    });

    setRecord.customer = Promise.resolve((foundOutlet as any).__customer__);
    setRecord.redemptionCode = Promise.resolve(redemptionCode);

    setRecord.user = Promise.resolve(me);

    await this.redemptionRecordRepo.save(setRecord);

    return plainToClass(
      RedemptionRecordDTO,
      {
        redemptionCode: redemptionCode.redemptionCode,
        status: code.status,
        itemPrizeType: redemptionCode.itemPrizeType,
      },
      { excludeExtraneousValues: true });
  }

  public async addPrizeToRedemptionCode(code: AddPrizeToCodeDTO): Promise<ShowMessageDTO> {
    const findCode = await this.redemptionCodeRepo.findOne({
      where: {
        redemptionCode: code.redemptionCode,
      },
    });

    findCode.itemPrizeCode = code.itemPrizeCode;

    await this.redemptionCodeRepo.save(findCode);
    return { message: 'success' };
  }

  public async checkIfCodeIsValid(code: string): Promise<RedemptionCode> {
    return await this.redemptionCodeRepo.findOne({
      where: {
        redemptionCode: code,
      },
    });
  }

  public async reportRedemptionCode(code: CheckCodeDTO, me: User): Promise<ShowMessageDTO> {
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

  public async getUserRedemptionRecords(id: string): Promise<ActivityDTO> {
    const myRecords: any = await this.redemptionRecordRepo.find({
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

    return plainToClass(ActivityDTO, records, { excludeExtraneousValues: true });
  }

  public async sendEmail(body: HelpDeskDTO): Promise<object> {
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
        throw new NotAcceptableException('This request is not accepted');
      }
    });

    return { message: 'Success!' };
  }
  public async getOutletActivity(id: string): Promise<OutletActivityDTO> {
    const user: any = await this.userRepo.findOne({
      where: {
        id,
      },
      relations: ['outlet'],
    });

    const findRecordsForTheOutlet: any = await this.redemptionRecordRepo.find({
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
    return plainToClass(OutletActivityDTO, recordForMyOutlet, { excludeExtraneousValues: true });
  }

  public async getAllEmails(): Promise<EmailDTO[]> {
    const emails = await this.userRepo.find();
    return plainToClass(EmailDTO, emails, { excludeExtraneousValues: true });
  }

  public async getAllUsernames(): Promise<UsernameDTO[]> {
    const usernames = await this.userRepo.find();
    return plainToClass(UsernameDTO, usernames, { excludeExtraneousValues: true });
  }

  public async uploadFile(file, user): Promise<any> {
    const changeUserPic = await this.userRepo.findOne({
      where: {
        id: user.id
      }
    });

    changeUserPic.imageID = file[0].filename;
    return await this.userRepo.save(changeUserPic);
  }
}
