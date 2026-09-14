import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum StatusCertidao {
  ATIVA = 'ativa',
  SUBSTITUIDA = 'substituida',
  REVOGADA = 'revogada',
}

@Entity('certidoes')
export class Certidao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 64, unique: true })
  identificador: string;

  @Column({ type: 'date', name: 'data_casal' })
  dataCasal: string;

  @Column({ type: 'text', name: 'mensagem_especial', nullable: true })
  mensagemEspecial: string | null;

  // MVP: só o nome do modelo/moldura, sem tabela própria por enquanto.
  @Column({ type: 'varchar', length: 80, default: 'classico' })
  modelo: string;

  @Column({ type: 'int', default: 1 })
  versao: number;

  @Column({
    type: 'enum',
    enum: StatusCertidao,
    default: StatusCertidao.ATIVA,
  })
  status: StatusCertidao;

  // Aponta pra certidão que esta substituiu (ex: ao adicionar cláusula
  // nova, a antiga vira SUBSTITUIDA e essa nasce apontando pra ela).
  @Column({ name: 'certidao_anterior_id', nullable: true })
  certidaoAnteriorId: string | null;

  @ManyToOne(() => Certidao, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'certidao_anterior_id' })
  certidaoAnterior: Certidao | null;

  @Column({ type: 'timestamptz', name: 'valido_ate', nullable: true })
  validoAte: Date | null;

  @Column({
    type: 'boolean',
    name: 'mostrar_pontuacao_publica',
    default: true,
  })
  mostrarPontuacaoPublica: boolean;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
