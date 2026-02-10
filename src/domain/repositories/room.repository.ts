import { Room } from '../entities/room';

/**
 * Contrato de persistência de salas.
 */
export interface RoomRepository {
  create(name: string): Promise<Room>;
  findById(id: string): Promise<Room | null>;
  findByName(name: string): Promise<Room | null>;
}
