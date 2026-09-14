import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCertificateDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(38)
  partnerOneName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(38)
  partnerTwoName: string;

  @IsDateString()
  coupleDate: string;

  @IsString()
  @MaxLength(48)
  location: string;

  @IsIn(['burgundy', 'gold', 'teal'])
  accentKey: string;

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
