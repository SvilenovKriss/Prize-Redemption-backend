import { Expose } from 'class-transformer';

export class ShowOutletDTO {
    @Expose()
    public id: string;

    @Expose()
    public name: string;

    @Expose()
    public customerId: string;

    @Expose()
    public customerName: string;

}
