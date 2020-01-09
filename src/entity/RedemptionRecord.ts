import { Column, PrimaryGeneratedColumn, OneToOne, Entity, ManyToOne } from 'typeorm';
import { RedemptionCode } from './RedemptionCode';
import { User } from './User';
import { Outlet } from './Outlet';
import { Status } from '../common/enum/status';
import { Customer } from './Customer';

@Entity()
export class RedemptionRecord {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne(type => User, user => user.redemptionRecords)
    public user: Promise<User>;

    @Column('timestamp')
    public timeStamp: string;

    @Column()
    public status: Status;

    @ManyToOne(type => Outlet, outlet => outlet.redemptionRecords)
    public outlet: Promise<Outlet>;

    @ManyToOne(type => Customer, customer => customer.redemptionRecords)
    public customer: Promise<Customer>;

    @ManyToOne(type => RedemptionCode, code => code.redemptionRecords)
    public redemptionCode: Promise<RedemptionCode>;
}
