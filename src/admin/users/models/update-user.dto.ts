import { IsString, MinLength, Length } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateUserDTO {

    @Optional()
    @IsString()
    public email: string;

    @IsString()
    @Length(6, 20)
    @Optional()
    public username: string;

    @IsString()
    @MinLength(8)
    @Optional()
    public password: string;
}
