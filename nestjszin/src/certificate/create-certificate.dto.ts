import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CertificateClauseDto {
  @IsString()
  id: string;

  @IsString()
  text: string;
}

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificateClauseDto)
  clauses: CertificateClauseDto[];

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
