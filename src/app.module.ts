import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';
import { UserModule } from './user/user.module';
import { CoreModule } from './core/core.module';
import { AdminModule } from './admin/admin.module';
import { Customer } from './entity/Customer';
import { User } from './entity/User';
import { Outlet } from './entity/Outlet';
import { RedemptionCode } from './entity/RedemptionCode';
import { RedemptionRecord } from './entity/RedemptionRecord';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: configService.dbType as any,
        host: configService.dbHost,
        port: configService.dbPort,
        username: configService.dbUsername,
        password: configService.dbPassword,
        database: configService.dbName,
        entities: [Customer, User, Outlet, RedemptionCode, RedemptionRecord],
      }),
    }),
    UserModule,
    CoreModule,
    AdminModule,
  ],
  controllers: [AppController],
})
export class AppModule { }
