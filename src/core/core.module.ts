import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/User';
import { UserService } from './services/user.service';
import { RedemptionCode } from '../entity/RedemptionCode';
import { RedemptionRecord } from '../entity/RedemptionRecord';
import { Outlet } from '../entity/Outlet';

@Module({
  imports: [TypeOrmModule.forFeature([User, RedemptionCode, RedemptionRecord, Outlet])],
  providers: [UserService],
  exports: [UserService],
})
export class CoreModule {

}
