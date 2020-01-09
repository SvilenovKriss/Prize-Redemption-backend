import { IsString, MinLength, Length } from 'class-validator';

export class UpdateUserOutletDTO {

    @IsString()
    public outletId: string;

}
