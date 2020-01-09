import { Controller, Post, UseGuards, Body, ValidationPipe, Delete, Param, Put, Get, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { ReportQueryDTO } from './models/report-query.dto';
import { ShowRedemptionRecordDTO } from '../user/models/show-redemption-record.dto';

// add return types and DTOs for all http requests

@Controller('')
export class AdminController {

    public constructor(private readonly adminService: AdminService) { }

    @Get('/report')
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles('Admin')
    public async GetReport(
      @Query(new ValidationPipe({ transform: true, whitelist: true })) query: ReportQueryDTO): Promise<ShowRedemptionRecordDTO[]> {
      const records = await this.adminService.showRecordsByQuery(query);
      return records;
    }

}
