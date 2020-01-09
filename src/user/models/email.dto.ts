import { Expose } from 'class-transformer';

export class EmailDTO {
    @Expose()
    public email: string;
}
