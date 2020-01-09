import { IsString, Matches } from 'class-validator';
import { Expose } from 'class-transformer';
import { Status } from '../../common/enum/status';
import { PrizeItemType } from '../../common/enum/prizeItemType';

export class ShowRedemptionRecordDTO {
    @Expose()
    @Matches(/^[A-Za-z0-9-]+$/)
    public redemptionCode: string;

    @Expose()
    public id: string;

    @Expose()
    public userId: string;

    @Expose()
    public username: string;

    @Expose()
    public timeStamp: string;

    @Expose()
    public status: Status;

    @Expose()
    public itemPrizeCode: string;

    @Expose()
    public itemPrizeType: PrizeItemType;

    @Expose()
    public outlet: string;

    @Expose()
    public customer: string;

}
