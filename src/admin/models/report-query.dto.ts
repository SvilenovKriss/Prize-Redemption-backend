import { IsDate, IsString, IsOptional } from 'class-validator';
import { Timestamp } from 'typeorm';

export class ReportQueryDTO {
  @IsString()
  @IsOptional()
  public userId: string;

  @IsString()
  @IsOptional()
  public outletId: string;

  @IsString()
  @IsOptional()
  public customerId: string;

  @IsOptional()
  public fromDate: Timestamp;

  @IsOptional()
  public untilDate: Timestamp;

  @IsString()
  @IsOptional()
  public prizeId: string;

  @IsString()
  @IsOptional()
  public order?: 'asc' | 'desc';
}
