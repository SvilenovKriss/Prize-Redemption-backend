import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from '../core/services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedemptionCode } from '../entity/RedemptionCode';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { RedemptionRecord } from '../entity/RedemptionRecord';
import { Outlet } from '../entity/Outlet';
import { CoreModule } from '../core/core.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [CoreModule, TypeOrmModule.forFeature([RedemptionCode, RedemptionRecord, Outlet]), PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.jwtSecret,
        signOptions: {
          expiresIn: configService.jwtExpireTime,
        },
      }),
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './uploads'
      }),
    })],
  controllers: [UserController],
  providers: [],
  exports: [],
})
export class UserModule { }
