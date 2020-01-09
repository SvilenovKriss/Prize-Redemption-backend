import { IsString } from 'class-validator';

export class UpdateOutletCustomerDTO {

  @IsString()
  customerId: string;

}
