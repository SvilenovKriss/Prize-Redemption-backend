import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Outlet } from '../../entity/Outlet';
import { Repository } from 'typeorm';
import { Customer } from '../../entity/Customer';
import { OutletDTO } from './models/outlet.dto';
import { UpdateOutletDTO } from './models/update-outlet.dto';
import { ShowOutletDTO } from './models/show-outlet.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class OutletsService {

  public constructor(
    @InjectRepository(Outlet) private readonly outletRepo: Repository<Outlet>,
    @InjectRepository(Customer) private readonly customerRepo: Repository<Customer>,
  ) { }

  //

  public async createNewOutlet(outlet: OutletDTO): Promise<ShowOutletDTO> {

    const checkOutletName = await this.validateIfOutletNameExists(outlet.name);

    if (checkOutletName && outlet.name === checkOutletName.name) {
      throw new BadRequestException('This outlet name is already beeing used!');
    }

    const outletToAdd = new Outlet();
    outletToAdd.name = outlet.name;

    const customer = await this.customerRepo.findOne({ id: outlet.customerId });
    outletToAdd.customer = Promise.resolve(customer);

    const savedOutlet = await this.outletRepo.save(outletToAdd);
    return plainToClass(
      ShowOutletDTO,
      {
        ...savedOutlet,
        customerId: customer.id,
        customerName: customer.name,
      },
      { excludeExtraneousValues: true });
  }

  //

  public async updateOutlet(outletId: string, outlet: UpdateOutletDTO): Promise<ShowOutletDTO> {
    const outletToUpdate: Outlet = await this.outletRepo.findOne(
      {
        relations: ['customer'],
        where: { id: outletId },
      });

    if (!outletToUpdate) {
      throw new Error('No outlet with that Id exists!');
    }

    const checkOutletName = await this.validateIfOutletNameExists(outlet.name);

    if (checkOutletName && outlet.name === checkOutletName.name) {
      throw new BadRequestException('This outlet name is already beeing used!');
    }

    outletToUpdate.name = outlet.name;

    const savedOutlet = await this.outletRepo.save(outletToUpdate);
    return plainToClass(
      ShowOutletDTO,
      {
        ...savedOutlet,
        customerId: (outletToUpdate as any).__customer__.id,
        customerName: (outletToUpdate as any).__customer__.name,
      },
      { excludeExtraneousValues: true });
  }

  //

  public async deleteOutlet(outletId: string): Promise<ShowOutletDTO> {
    const outletToDelete: Outlet = await this.outletRepo.findOne(
      {
        relations: ['customer'],
        where: { id: outletId },
      });

    if (!outletToDelete) {
      throw new Error('No outlet with that Id exists!');
    }

    outletToDelete.isDeleted = true;
    const savedOutlet = await this.outletRepo.save(outletToDelete);

    return plainToClass(
      ShowOutletDTO,
      {
        ...savedOutlet,
        customerId: (outletToDelete as any).__customer__.id,
        customerName: (outletToDelete as any).__customer__.name,
      },
      { excludeExtraneousValues: true });
  }

  //

  public async changeOutletCustomer(outletId: string, customerId: string): Promise<ShowOutletDTO> {

    const outletToUpdate: Outlet = await this.outletRepo.findOne({ where: { id: outletId } });
    const customerToUpdate: Customer = await this.customerRepo.findOne({ where: { id: customerId } });

    if (!outletToUpdate) {
      throw new BadRequestException('No outlet with that Id exists!');
    }

    if (!customerToUpdate) {
      throw new BadRequestException('No customer with that Id exists!');
    }

    outletToUpdate.customer = Promise.resolve(customerToUpdate);

    const savedOutlet = await this.outletRepo.save(outletToUpdate);
    return plainToClass(
      ShowOutletDTO,
      {
        ...savedOutlet,
        customerId: customerToUpdate.id,
        customerName: customerToUpdate.name,
      },
      { excludeExtraneousValues: true });
  }

  //

  public async validateIfOutletNameExists(name: string) {
    const checkForName = await this.outletRepo.findOne({
      where: {
        name,
      },
    });
    return checkForName;
  }

  public async getOutlets(): Promise<ShowOutletDTO[]> {
    const outlets = await this.outletRepo.find(
      {
        where: {
          isDeleted: 0,
        },
        relations: ['customer'],
      });

    const transformedOutlets = outlets.map(
      (outlet: any) => plainToClass(
        ShowOutletDTO,
        {...outlet,
        customerId: outlet.__customer__.id,
        customerName: outlet.__customer__.name},
        { excludeExtraneousValues: true },
      ));

    return transformedOutlets;
  }
}
