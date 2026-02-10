import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

/**
 * Entidade de infraestrutura (ORM) para sala.
 */
@Entity('rooms')
export class RoomEntity {
  @PrimaryColumn('text')
  id!: string;

  @Column({ type: 'text', unique: true })
  name!: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;
}
