import { Expose } from 'class-transformer';

export class UsersDTO {

    @Expose()
    id: string;

    @Expose()
    public email: string;

    @Expose()
    public username: string;

    @Expose()
    // tslint:disable-next-line: variable-name
    public __outlet__: string;
}
