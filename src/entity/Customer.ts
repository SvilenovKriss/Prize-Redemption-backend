import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Outlet } from './Outlet';
import { RedemptionRecord } from './RedemptionRecord';

@Entity()
export class Customer {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public name: string;

    @OneToMany(type => Outlet, outlet => outlet.customer)
    outlets: Promise<Outlet[]>;

    @OneToMany(type => RedemptionRecord, record => record.customer)
    redemptionRecords: Promise<RedemptionRecord[]>;

    @Column({default: false})
    isDeleted: boolean;
}
