import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certidao } from './certidao.entity.js';
import { CertidoesService } from './certidoes.service.js';
import { CertidoesController } from './certidoes.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Certidao])],
  controllers: [CertidoesController],
  providers: [CertidoesService],
  exports: [CertidoesService],
})
export class CertidoesModule {}
