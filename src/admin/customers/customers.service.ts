import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../../entity/Customer';
import { Repository } from 'typeorm';
import { CustomerDTO } from './models/customer.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CustomersService {

  public constructor(
    @InjectRepository(Customer) private readonly customerRepo: Repository<Customer>,
  ) { }

  //

  public async createNewCustomer(customer: CustomerDTO): Promise<CustomerDTO> {

    const checkCustomerName = await this.validateIfCustomerNameExists(customer.name);

    if (checkCustomerName) {
      throw new BadRequestException('This customer name is already beeing used!');
    }

    const customerToAdd = new Customer();
    customerToAdd.name = customer.name;

    const savedCustomer = await this.customerRepo.save(customerToAdd);
    return plainToClass(CustomerDTO, savedCustomer, { excludeExtraneousValues: true });
  }

  //

  public async updateCustomer(customerId: string, customer: CustomerDTO): Promise<CustomerDTO> {
    const customerToUpdate: Customer = await this.customerRepo.findOne({ where: { id: customerId } });

    if (!customerToUpdate) {
      throw new Error('No customer with that Id exists!');
    }

    const checkCustomerName = await this.validateIfCustomerNameExists(customer.name);

    if (checkCustomerName && customer.name === checkCustomerName.name) {
      throw new BadRequestException('This customer name is already beeing used!');
    }

    customerToUpdate.name = customer.name;

    const savedCustomer = await this.customerRepo.save(customerToUpdate);
    return plainToClass(CustomerDTO, savedCustomer, { excludeExtraneousValues: true });
  }

  //

  public async getCustomer(customerId: string): Promise<CustomerDTO> {
    const customerToGet: Customer = await this.customerRepo.findOne({ where: { id: customerId } });

    if (!customerToGet) {
      throw new Error('No customer with that Id exists!');
    }

    return plainToClass(CustomerDTO, customerToGet, { excludeExtraneousValues: true });
  }

  //

  public async deleteCustomer(customerId: string): Promise<CustomerDTO> {
    const customerToDelete: Customer = await this.customerRepo.findOne({ where: { id: customerId } });

    if (!customerToDelete) {
      throw new Error('No customer with that Id exists!');
    }

    customerToDelete.isDeleted = true;

    const savedCustomer = await this.customerRepo.save(customerToDelete);
    return plainToClass(CustomerDTO, savedCustomer, { excludeExtraneousValues: true });
  }

  //

  public async validateIfCustomerNameExists(name: string) {
    const checkForName = await this.customerRepo.findOne({
      where: {
        name,
      },
    });
    return checkForName;
  }

  public async getAllCustomers() {
    return await this.customerRepo.find({
      where: {
        isDeleted: 0,
      },
    });
  }
}
