import { Injectable, BadRequestException } from '@nestjs/common';
import { Outlet } from '../entity/Outlet';
import { Repository, Between } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../entity/Customer';
import { User } from '../entity/User';
import { ReportQueryDTO } from './models/report-query.dto';
import { RedemptionRecord } from '../entity/RedemptionRecord';
import { plainToClass } from 'class-transformer';
import { ShowRedemptionRecordDTO } from '../user/models/show-redemption-record.dto';

@Injectable()
export class AdminService {

  public constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(RedemptionRecord) private readonly redemptionRecordRepo: Repository<RedemptionRecord>,
    @InjectRepository(Outlet) private readonly outletRepo: Repository<Outlet>,
    @InjectRepository(Customer) private readonly customerRepo: Repository<Customer>,
  ) { }

  public async showRecordsByQuery(query: ReportQueryDTO): Promise<ShowRedemptionRecordDTO[]> {

    let filteredRecords: RedemptionRecord[] = null;

    let recordsFirstFilteredBy: string;

//

    if (query.userId && !filteredRecords) {

      const foundUser = await this.userRepo.findOne({
        where: {
            id: query.userId,
            isDeleted: false,
        },
      });

      if (!foundUser) {
        throw new BadRequestException('No user with this id exists!');
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
        throw new BadRequestException('Dates must be in order!');
      }

      filteredRecords = await this.redemptionRecordRepo.find({
        relations: ['redemptionCode', 'user', 'outlet', 'customer'],
        where: {
            timeStamp: Between(query.fromDate, query.untilDate),
        },
      });

      recordsFirstFilteredBy = 'date';

    }

    // if (query.userId && recordsFirstFilteredBy !== 'user') {

    //   filteredRecords.filter(record => record.user === query.outletId);

    // }

    if (query.outletId && recordsFirstFilteredBy !== 'outlet') {

      filteredRecords = filteredRecords.filter(async record => (await record.outlet).id === query.outletId);

    }

    if (query.customerId && recordsFirstFilteredBy !== 'customer') {

      filteredRecords = filteredRecords.filter(async record => (await record.customer).id === query.customerId);

    }

    if (query.fromDate && query.untilDate && recordsFirstFilteredBy !== 'date') {

      filteredRecords = filteredRecords.filter(
        record => (
          (new Date(record.timeStamp) >= new Date(query.fromDate.toString()))
          &&
          (new Date(record.timeStamp) <= new Date(query.untilDate.toString()))
          ),
      );

    }

    const transformedAndFilteredRecords = filteredRecords.map(
      (record: any) => plainToClass(
          ShowRedemptionRecordDTO,
          {...record,
          redemptionCode: record.__redemptionCode__.redemptionCode,
          userId: record.__user__.id,
          username: record.__user__.username,
          outlet: record.__outlet__.name,
          customer: record.__customer__.name},
          { excludeExtraneousValues: true }));

    return transformedAndFilteredRecords;

  }

}
