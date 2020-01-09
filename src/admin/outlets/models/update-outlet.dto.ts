import { IsString } from 'class-validator';

export class UpdateOutletDTO {

  @IsString()
  name: string;

}
