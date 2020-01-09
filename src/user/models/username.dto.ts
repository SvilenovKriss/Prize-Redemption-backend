import { Expose } from 'class-transformer';

export class UsernameDTO {
    @Expose()
    public username: string;
}
