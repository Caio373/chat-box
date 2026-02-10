import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateRoomInput } from '../dto/create-room.input';
import { RoomRepository } from 'src/domain/repositories/room.repository';
import { ROOM_REPOSITORY } from 'src/infrastructure/providers/injection-tokens';

/**
 * Caso de uso: criação de sala.
 */
@Injectable()
export class CreateRoomUseCase {
  constructor(
    @Inject(ROOM_REPOSITORY)
    private readonly roomRepository: RoomRepository
  ) {}

  async execute(input: CreateRoomInput) {
    const existingRoom = await this.roomRepository.findByName(input.name.trim());
    if (existingRoom) {
      throw new ConflictException('Já existe uma sala com este nome.');
    }

    return this.roomRepository.create(input.name.trim());
  }
}
