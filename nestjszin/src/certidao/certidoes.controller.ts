import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CertidoesService } from './certidoes.service.js';
import { CriarCertidaoDto } from './criar-certidao.dto.js';
import { Certidao } from './certidao.entity.js';

@Controller('certidoes')
export class CertidoesController {
  constructor(private readonly certidoesService: CertidoesService) {}

  @Post()
  async criar(@Body() dto: CriarCertidaoDto): Promise<Certidao> {
    return await this.certidoesService.criar(dto);
  }

  @Get(':identificador')
  async buscarPorIdentificador(
    @Param('identificador') identificador: string,
  ): Promise<Certidao> {
    return await this.certidoesService.buscarPorIdentificador(identificador);
  }
}
