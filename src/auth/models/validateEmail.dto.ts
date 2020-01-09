import { Expose } from 'class-transformer';
import { UserRole } from '../../common/UserRole';
import { Outlet } from '../../entity/Outlet';
import { RedemptionRecord } from '../../entity/RedemptionRecord';

export class ValidateEmailDTO {

    @Expose()
    public id: string;

    @Expose()
    public email: string;

    @Expose()
    public username: string;

    @Expose()
    public role: UserRole;

    @Expose()
    public outlet: Outlet;

    @Expose()
    public isDeleted: boolean;
}
