import { Expose } from 'class-transformer';

export class OutletActivityDTO {

    @Expose()
    public status: string;

    @Expose()
    // tslint:disable-next-line: variable-name
    public __user__: string;

    @Expose()
    // tslint:disable-next-line: variable-name
    public __outlet__: string;

    @Expose()
    // tslint:disable-next-line: variable-name
    public __redemptionCode__: string;
}
