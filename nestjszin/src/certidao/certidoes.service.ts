import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'node:crypto';
import { Certidao } from './certidao.entity.js';
import { CriarCertidaoDto } from './criar-certidao.dto.js';

function gerarIdentificadorCertidao(): string {
  return randomUUID();
}

@Injectable()
export class CertidoesService {
  constructor(
    @InjectRepository(Certidao)
    private readonly repository: Repository<Certidao>,
  ) {}

  async criar(dto: CriarCertidaoDto): Promise<Certidao> {
    const certidao = this.repository.create({
      ...dto,
      identificador: gerarIdentificadorCertidao(),
    });
    return await this.repository.save(certidao);
  }

  async buscarPorIdentificador(identificador: string): Promise<Certidao> {
    const certidao = await this.repository.findOne({
      where: { identificador },
    });

    if (!certidao) {
      throw new NotFoundException('Certidão não encontrada');
    }

    return certidao;
  }
}
