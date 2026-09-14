import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'node:crypto';
import { Certificate } from './certificate.entity.js';
import { CreateCertificateDto } from './create-certificate.dto.js';

function generateCertificatePublicId(): string {
  return randomUUID();
}

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(Certificate)
    private readonly repository: Repository<Certificate>,
  ) {}

  async create(dto: CreateCertificateDto): Promise<Certificate> {
    const certificate = this.repository.create({
      ...dto,
      publicId: generateCertificatePublicId(),
    });
    return await this.repository.save(certificate);
  }

  async findByPublicId(publicId: string): Promise<Certificate> {
    const certificate = await this.repository.findOne({
      where: { publicId },
    });

    if (!certificate) {
      throw new NotFoundException('Certidão não encontrada');
    }

    return certificate;
  }
}
