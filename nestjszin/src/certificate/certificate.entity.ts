import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum CertificateStatus {
  ACTIVE = 'active',
  REPLACED = 'replaced',
  REVOKED = 'revoked',
}

@Entity('certificates')
export class Certificate {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ type: 'varchar', length: 64, unique: true })
  publicId: string;

  @Column({ type: 'date', name: 'couple_date' })
  coupleDate: string;

  @Column({ type: 'text', name: 'special_message', nullable: true })
  specialMessage: string | null;

  @Column({ type: 'varchar', length: 80, default: 'classico' })
  template: string;

  @Column({ type: 'int', default: 1 })
  version: number;

  @Column({
    type: 'enum',
    enum: CertificateStatus,
    default: CertificateStatus.ACTIVE,
  })
  status: CertificateStatus;

  @Column({ type: 'bigint', name: 'previous_certificate_id', nullable: true })
  previousCertificateId: string | null;

  @ManyToOne(() => Certificate, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'previous_certificate_id' })
  previousCertificate: Certificate | null;

  @Column({ type: 'timestamptz', name: 'valid_until', nullable: true })
  validUntil: Date | null;

  @Column({
    type: 'boolean',
    name: 'show_public_score',
    default: true,
  })
  showPublicScore: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
