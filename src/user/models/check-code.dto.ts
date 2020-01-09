import { IsString, Matches } from 'class-validator';

export class CheckCodeDTO {
    @IsString()
    @Matches(/^[A-Za-z0-9-]+$/)
    public redemptionCode: string;
}
