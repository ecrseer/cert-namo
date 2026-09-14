import { IsDateString, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateCertificateDto {
  @IsDateString()
  coupleDate: string;

  @IsOptional()
  @IsString()
  specialMessage?: string;

  @IsOptional()
  @IsString()
  template?: string;

  @IsOptional()
  @IsBoolean()
  showPublicScore?: boolean;
}
