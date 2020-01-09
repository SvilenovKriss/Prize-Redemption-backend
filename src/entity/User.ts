import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { UserRole } from '../common/UserRole';
import { Outlet } from './Outlet';
import { RedemptionRecord } from './RedemptionRecord';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public email: string;

    @Column()
    public username: string;

    @CreateDateColumn()
    public createdOn: Date;

    @Column()
    public password: string;

    @Column('nvarchar', { default: 'StandartUser' })
    public role: UserRole;

    @OneToMany(type => RedemptionRecord, record => record.user)
    public redemptionRecords: Promise<RedemptionRecord[]>;

    @ManyToOne(type => Outlet, outlet => outlet.users)
    public outlet: Promise<Outlet>;

    @Column({default: false})
    public isDeleted: boolean;

    @Column()
    public imageID: string;
}
