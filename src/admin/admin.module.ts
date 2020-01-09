import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Outlet } from '../entity/Outlet';
import { PassportModule } from '@nestjs/passport';
import { Customer } from '../entity/Customer';
import { User } from '../entity/User';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { CustomersService } from './customers/customers.service';
import { CustomersController } from './customers/customers.controller';
import { OutletsService } from './outlets/outlets.service';
import { OutletsController } from './outlets/outlets.controller';
import { RedemptionRecord } from '../entity/RedemptionRecord';

@Module({
  imports: [TypeOrmModule.forFeature([Outlet, Customer, User, RedemptionRecord]),
  PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [AdminController, UsersController, CustomersController, OutletsController],
  providers: [AdminService, UsersService, CustomersService, OutletsService],
})
export class AdminModule {}
