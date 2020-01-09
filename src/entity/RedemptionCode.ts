import { PrimaryGeneratedColumn, OneToOne, JoinColumn, Entity, Column, OneToMany } from 'typeorm';
import { RedemptionRecord } from './RedemptionRecord';
import { PrizeItemType } from '../common/enum/prizeItemType';

@Entity()
export class RedemptionCode {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('nvarchar')
    public redemptionCode: string;

    @Column('nvarchar', { default: '' })
    public itemPrizeCode: string;

    @Column('nvarchar', { default: 'Small' })
    itemPrizeType: PrizeItemType;

    @Column({ default: false })
    public reportedCode: boolean;

    @Column({ default: '' })
    public reportedBy: string;

    @OneToMany(type => RedemptionRecord, redemptionRecord => redemptionRecord.redemptionCode)
    public redemptionRecords: Promise<RedemptionRecord[]>;
}
