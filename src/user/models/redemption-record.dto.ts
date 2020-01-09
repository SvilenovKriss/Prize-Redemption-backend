import { IsString, Matches, IsOptional } from 'class-validator';
import { Status } from '../../common/enum/status';
import { PrizeItemType } from '../../common/enum/prizeItemType';
import { Expose } from 'class-transformer';

export class RedemptionRecordDTO {
    @IsString()
    @Matches(/^[A-Za-z0-9-]+$/)
    public redemptionCode: string;

    // redemptionCode id or acual code? also itemPrize

    @Expose()
    @IsString()
    @Matches(/Redeemed|Cancelled|Declined/)
    public status: Status;

    @Expose()
    @IsOptional()
    public itemPrizeCode: string;

    @Expose()
    @IsOptional()
    public itemPrizeType: PrizeItemType;
}
