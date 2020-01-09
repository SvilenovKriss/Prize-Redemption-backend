import { Expose } from 'class-transformer';

export class ActivityDTO {

    @Expose()
    public id: string;

    @Expose()
    public status: string;

    @Expose()
    public timeStamp: Date;

    @Expose()
    // tslint:disable-next-line: variable-name
    public __outlet__: string;

    @Expose()
    // tslint:disable-next-line: variable-name
    public __redemptionCode__: string;
}
