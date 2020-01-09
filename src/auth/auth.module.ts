import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '../config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from '../entity/User';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
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
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule { }
