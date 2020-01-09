import { Controller, Post, UseGuards, Body, ValidationPipe, Put, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { UpdateUserDTO } from './models/update-user.dto';
import { UsersService } from './users.service';
import { UpdateUserOutletDTO } from './models/update-user-outlet.dto';
import { RegisterDTO } from '../../auth/models/register.dto';
import { ShowUserDTO } from './models/show-user.dto';

// add return types and DTOs for all http requests

@Controller('user')
export class UsersController {

  public constructor(private readonly usersService: UsersService) { }

  @Post('/create')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('Admin')
  public async createUser(
    @Body(new ValidationPipe({ transform: true, whitelist: true })) body: RegisterDTO): Promise<ShowUserDTO> {
    return this.usersService.createNewUser(body);
  }

  @Put('/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('Admin')
  public async updateUser(
    @Body(new ValidationPipe({ transform: true, whitelist: false })) body: Partial<UpdateUserDTO>,
    @Param('id') userId: string): Promise<ShowUserDTO> {
    return this.usersService.updateUser(userId, body);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('Admin')
  public async deleteUserById(
    @Param('id') userId: string): Promise<ShowUserDTO> {
    return await this.usersService.deleteUser(userId);
  }

  @Put('/:id/outlet')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('Admin')
  public async updateUserOutlet(
    @Body(new ValidationPipe({ transform: true, whitelist: true })) body: UpdateUserOutletDTO,
    @Param('id') userId: string): Promise<ShowUserDTO> {
    return this.usersService.updateUserOutlet(userId, body.outletId);
  }

  @Put('/:id/role')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('Admin')
  public async makeUserAdmin(
    @Param('id') userId: string): Promise<ShowUserDTO> {
    return await this.usersService.createAdminFromUser(userId);
  }

}
