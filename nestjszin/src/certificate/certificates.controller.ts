import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CertificatesService } from './certificates.service.js';
import { CreateCertificateDto } from './create-certificate.dto.js';
import { Certificate } from './certificate.entity.js';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Post()
  async create(@Body() dto: CreateCertificateDto): Promise<Certificate> {
    return await this.certificatesService.create(dto);
  }

  @Get(':publicId')
  async findByPublicId(
    @Param('publicId') publicId: string,
  ): Promise<Certificate> {
    return await this.certificatesService.findByPublicId(publicId);
  }
}
