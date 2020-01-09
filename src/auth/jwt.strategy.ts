import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.jwtSecret,
    });
  }

  async validate(payload: any) {
    const email = await this.authService.validateIfEmailExist(payload.email);
    if (!email) {
      throw new UnauthorizedException();
    }

    return email;
  }
}
