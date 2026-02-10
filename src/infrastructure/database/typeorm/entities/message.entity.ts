import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

/**
 * Entidade de infraestrutura (ORM) para mensagem.
 */
@Entity('messages')
export class MessageEntity {
  @PrimaryColumn('text')
  id!: string;

  @Column({ type: 'text' })
  roomId!: string;

  @Column({ type: 'text' })
  userId!: string;

  @Column({ type: 'text' })
  userName!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'text' })
  type!: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;
}
