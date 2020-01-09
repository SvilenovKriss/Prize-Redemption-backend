import { IsString } from 'class-validator';

export class HelpDeskDTO {

    @IsString()
    public subject: string;

    @IsString()
    public description: string;
}
