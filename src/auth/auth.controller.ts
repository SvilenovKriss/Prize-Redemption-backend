import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { LoginDTO } from './models/login.dto';
import { AuthService } from './auth.service';
import { LoggedUserDTO } from './models/logged.dto';

@Controller()
export class AuthController {

    public constructor(private readonly authService: AuthService) { }

    @Post('login')  
    public async login(@Body(new ValidationPipe({ whitelist: true, transform: true })) body: LoginDTO): Promise<LoggedUserDTO> {
        return this.authService.login(body);
    }
}
