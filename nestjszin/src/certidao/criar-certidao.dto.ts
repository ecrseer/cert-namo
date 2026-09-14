import { IsDateString, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CriarCertidaoDto {
  @IsDateString()
  dataCasal: string;

  @IsOptional()
  @IsString()
  mensagemEspecial?: string;

  @IsOptional()
  @IsString()
  modelo?: string;

  @IsOptional()
  @IsBoolean()
  mostrarPontuacaoPublica?: boolean;
}
