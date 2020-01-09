import { IsString, Matches } from 'class-validator';

export class AddPrizeToCodeDTO {
    @IsString()
    @Matches(/^[A-Za-z0-9-]+$/)
    public redemptionCode: string;

    @IsString()
    public itemPrizeCode: string;
}
