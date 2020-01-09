import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Customer } from './Customer';
import { User } from './User';
import { RedemptionRecord } from './RedemptionRecord';

@Entity()
export class Outlet {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public name: string;

    @OneToMany(type => User, user => user.outlet)
    users: Promise<User[]>;

    @ManyToOne(type => Customer, customer => customer.outlets)
    customer: Promise<Customer>;

    @OneToMany(type => RedemptionRecord, record => record.outlet)
    redemptionRecords: Promise<RedemptionRecord[]>;

    @Column({default: false})
    isDeleted: boolean;
}
