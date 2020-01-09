import { Expose } from 'class-transformer';
import { UserRole } from '../../common/UserRole';

export class LoggedUserDTO {

    @Expose()
    public id: string;

    @Expose()
    public email: string;

    @Expose()
    public username: string;

    @Expose()
    public role: UserRole;

    @Expose()
    public isDeleted: boolean;

    @Expose()
    public token: string;

    @Expose()
    public createdOn: Date;

    @Expose()
    public outletName: string;

    @Expose()
    public imageID: string;
}
