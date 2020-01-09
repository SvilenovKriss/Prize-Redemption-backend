import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Req,
  UseGuards,
  Get,
  Param,
  UseInterceptors,
  UploadedFiles,
  Res,
  Query,
} from '@nestjs/common';
import { UserService } from '../core/services/user.service';
import { RedemptionRecordDTO } from './models/redemption-record.dto';
import { AuthGuard } from '@nestjs/passport';
import { CheckCodeDTO } from './models/check-code.dto';
import { RedemptionCode } from '../entity/RedemptionCode';
import { RedemptionRecord } from '../entity/RedemptionRecord';
import { ShowMessageDTO } from './models/show-message.dto';
import { AddPrizeToCodeDTO } from './models/add-prize-code.dto';
import { ShowUserIdDTO } from './models/show-user-id.dto';
import { ActivityDTO } from './models/activity.dto';
import { LoggedUserDTO } from '../auth/models/logged.dto';
import { UsersDTO } from './models/users.dto';
import { HelpDeskDTO } from './models/help-desk.dto';
import { EmailDTO } from './models/email.dto';
import { UsernameDTO } from './models/username.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService) { }

  @Post('check-code')
  @UseGuards(AuthGuard())
  // tslint:disable-next-line: max-line-length
  public async checkCode(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: CheckCodeDTO,
  ): Promise<RedemptionCode | RedemptionRecord[]> {
    return await this.userService.checkForValidCode(body);
  }

  @Post('mark-code')
  @UseGuards(AuthGuard())
  public async markCode(
    @Req() req,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: RedemptionRecordDTO,
  ): Promise<RedemptionRecordDTO> {
    return await this.userService.markCode(body, req.user);
  }

  @Get('redemptionRecords/:id')
  @UseGuards(AuthGuard())
  public async getUserActivity(@Param('id') id: string): Promise<ActivityDTO> {
    return await this.userService.getUserRedemptionRecords(id);
  }

  @Post('report-code')
  @UseGuards(AuthGuard())
  public async reportRedemptionCode(
    @Req() req,
    @Body(new ValidationPipe({ transform: true, whitelist: true })) body: CheckCodeDTO): Promise<ShowMessageDTO> {
    return this.userService.reportRedemptionCode(body, req.user);
  }

  @Post('add-prize-to-code')
  @UseGuards(AuthGuard())
  public async addPrizeToRedemptionCode(
    @Body(new ValidationPipe({ transform: true, whitelist: true })) body: AddPrizeToCodeDTO): Promise<ShowMessageDTO> {
    return this.userService.addPrizeToRedemptionCode(body);
  }

  @Get('outlet-activity/:id')
  @UseGuards(AuthGuard())
  public async OutletActivity(@Param('id') id) {
    return await this.userService.getOutletActivity(id);
  }

  @Get('')
  @UseGuards(AuthGuard())
  public async getAllUsers(@Query('page') page: number): Promise<UsersDTO> {
    return await this.userService.getAllUsers(page);
  }

  @Post('help-desk')
  public async sendEmail(@Body(new ValidationPipe({ transform: true, whitelist: true })) body: HelpDeskDTO): Promise<object> {
    return await this.userService.sendEmail(body);
  }

  @Get('/username/:username')
  @UseGuards(AuthGuard())
  public async getUserIdByUsername(@Param('username') username: string): Promise<ShowUserIdDTO> {
    return await this.userService.getUserIdByUsername(username);
  }

  @Get('/email/:email')
  @UseGuards(AuthGuard())
  public async getUserIdByEmail(@Param('email') email: string): Promise<ShowUserIdDTO> {
    return await this.userService.getUserIdByEmail(email);
  }

  @Get('all-emails')
  @UseGuards(AuthGuard())
  public async getAllEmails(): Promise<EmailDTO[]> {
    return await this.userService.getAllEmails();
  }

  @Get('all-usernames')
  @UseGuards(AuthGuard())
  public async getAllUsernames(): Promise<UsernameDTO[]> {
    return await this.userService.getAllUsernames();
  }

  @Post('upload')
  @UseGuards(AuthGuard())
  @UseInterceptors(FilesInterceptor('image'))
  public async uploadFile(@UploadedFiles() file, @Req() req: any) {
    return await this.userService.uploadFile(file, req.user);
  }

  @Get('image/:image')
  @UseGuards(AuthGuard())
  public async getPicture(@Res() res, @Param('image') param) {
    return res.sendFile(param, { root: 'uploads' });
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  public async getUserByID(@Param('id') id: string): Promise<LoggedUserDTO> {
    return await this.userService.getUserByID(id);
  }
}
