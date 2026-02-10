import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

/**
 * Entidade de infraestrutura (ORM) para usuário.
 */
@Entity('users')
export class UserEntity {
  @PrimaryColumn('text')
  id!: string;

  @Column({ type: 'text' })
  name!: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;
}
