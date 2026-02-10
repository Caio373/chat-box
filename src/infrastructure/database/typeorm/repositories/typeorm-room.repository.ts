import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { RoomRepository } from 'src/domain/repositories/room.repository';
import { Room } from 'src/domain/entities/room';
import { RoomEntity } from '../entities/room.entity';

/**
 * Implementação concreta do contrato de sala com TypeORM.
 */
@Injectable()
export class TypeOrmRoomRepository implements RoomRepository {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>
  ) {}

  async create(name: string): Promise<Room> {
    const room = this.roomRepository.create({
      id: uuidv4(),
      name
    });

    const savedRoom = await this.roomRepository.save(room);
    return new Room(savedRoom.id, savedRoom.name, savedRoom.createdAt);
  }

  async findById(id: string): Promise<Room | null> {
    const room = await this.roomRepository.findOne({ where: { id } });
    if (!room) return null;

    return new Room(room.id, room.name, room.createdAt);
  }

  async findByName(name: string): Promise<Room | null> {
    const room = await this.roomRepository.findOne({ where: { name } });
    if (!room) return null;

    return new Room(room.id, room.name, room.createdAt);
  }
}
