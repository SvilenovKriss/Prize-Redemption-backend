import { Expose } from 'class-transformer';
import { UserRole } from '../../../common/UserRole';

export class ShowUserDTO {

    @Expose()
    public id: string;

    @Expose()
    public email: string;

    @Expose()
    public username: string;

    @Expose()
    public role: UserRole;

    @Expose()
    public outletId: string;

    @Expose()
    public outletName: string;

}
