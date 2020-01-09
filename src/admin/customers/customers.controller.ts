import { Controller, Post, UseGuards, Body, ValidationPipe, Get, Param, Delete, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { CustomerDTO } from './models/customer.dto';
import { CustomersService } from './customers.service';

@Controller('customer')
export class CustomersController {

  public constructor(private readonly customersService: CustomersService) { }

  @Post('')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('Admin')
  public async createCustomer(
    @Body(new ValidationPipe({ transform: true, whitelist: true })) body: CustomerDTO): Promise<CustomerDTO> {
    return this.customersService.createNewCustomer(body);
  }

  @Put('/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('Admin')
  public async updateCustomer(
    @Body(new ValidationPipe({ transform: true, whitelist: true })) body: CustomerDTO, @Param('id') userId: string): Promise<CustomerDTO> {
    return this.customersService.updateCustomer(userId, body);
  }

  @Get('/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('Admin')
  public async getCustomerById(
    @Param('id') customerId: string): Promise<CustomerDTO> {
    return await this.customersService.getCustomer(customerId);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('Admin')
  public async deleteCustomerById(
    @Param('id') customerId: string): Promise<CustomerDTO> {
    return await this.customersService.deleteCustomer(customerId);
  }

  @Get('')
  @UseGuards(AuthGuard())
  @Roles('Admin')
  public async getCustomers() {
    return await this.customersService.getAllCustomers();
  }
}
