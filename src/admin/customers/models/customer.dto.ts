import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CustomerDTO {

  @IsString()
  @Expose()
  name: string;

}
