import { Controller, Post, UseGuards, Body, ValidationPipe, Delete, Param, Put, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { OutletDTO } from './models/outlet.dto';
import { OutletsService } from './outlets.service';
import { UpdateOutletDTO } from './models/update-outlet.dto';
import { UpdateOutletCustomerDTO } from './models/update-outlet-customer.dto';
import { ShowOutletDTO } from './models/show-outlet.dto';

@Controller('outlet')
export class OutletsController {

  public constructor(private readonly outletsService: OutletsService) { }

  @Post('')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('Admin')
  public async createOutlet(
    @Body(new ValidationPipe({ transform: true, whitelist: true })) body: OutletDTO): Promise<ShowOutletDTO> {
    return this.outletsService.createNewOutlet(body);
  }

  @Put('/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('Admin')
  public async updateOutlet(
    @Body(new ValidationPipe({ transform: true, whitelist: true })) body: UpdateOutletDTO, @Param('id') outletId: string): Promise<ShowOutletDTO> {
    return this.outletsService.updateOutlet(outletId, body);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('Admin')
  public async deleteOutletById(
    @Param('id') outletId: string): Promise<ShowOutletDTO> {
    return await this.outletsService.deleteOutlet(outletId);
  }

  @Put('/:id/customer')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('Admin')
  public async updateOutletCustomer(
    @Body(new ValidationPipe({ transform: true, whitelist: true })) body: UpdateOutletCustomerDTO,
    @Param('id') outletId: string): Promise<ShowOutletDTO> {
    return this.outletsService.changeOutletCustomer(outletId, body.customerId);
  }

  @Get('')
  @UseGuards(AuthGuard())
  @Roles('Admin')
  public async getOutlets(): Promise<ShowOutletDTO[]> {
    return this.outletsService.getOutlets();
  }

}
