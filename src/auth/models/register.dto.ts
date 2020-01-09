import { Expose } from 'class-transformer';
import { IsString, MinLength, Length } from 'class-validator';
export class RegisterDTO {
    @IsString()
    public email: string;

    @IsString()
    @Length(4, 20)
    public username: string;

    @IsString()
    @MinLength(8)
    public password: string;

    @IsString()
    public outletId: string;
}
