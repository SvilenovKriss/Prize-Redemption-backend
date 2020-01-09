import { IsString } from 'class-validator';

export class OutletDTO {

  @IsString()
  name: string;

  @IsString()
  customerId: string;
}
