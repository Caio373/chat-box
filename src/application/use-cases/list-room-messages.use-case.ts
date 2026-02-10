import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MESSAGE_REPOSITORY, ROOM_REPOSITORY } from 'src/infrastructure/providers/injection-tokens';
import { MessageRepository } from 'src/domain/repositories/message.repository';
import { RoomRepository } from 'src/domain/repositories/room.repository';

/**
 * Caso de uso: histórico de mensagens por sala.
 */
@Injectable()
export class ListRoomMessagesUseCase {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepository,
    @Inject(ROOM_REPOSITORY)
    private readonly roomRepository: RoomRepository
  ) {}

  async execute(roomId: string) {
    const room = await this.roomRepository.findById(roomId);
    if (!room) {
      throw new NotFoundException('Sala não encontrada.');
    }

    return this.messageRepository.listByRoom(roomId);
  }
}
