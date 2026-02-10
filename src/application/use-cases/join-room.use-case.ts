import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JoinRoomInput } from '../dto/join-room.input';
import { ROOM_REPOSITORY, USER_REPOSITORY } from 'src/infrastructure/providers/injection-tokens';
import { RoomRepository } from 'src/domain/repositories/room.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';

/**
 * Caso de uso: entrada em sala.
 *
 * Neste MVP não persistimos "membership" em tabela própria para manter simplicidade,
 * mas o fluxo já está encapsulado para futura evolução.
 */
@Injectable()
export class JoinRoomUseCase {
  constructor(
    @Inject(ROOM_REPOSITORY)
    private readonly roomRepository: RoomRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository
  ) {}

  async execute(input: JoinRoomInput) {
    const [room, user] = await Promise.all([
      this.roomRepository.findById(input.roomId),
      this.userRepository.findById(input.userId)
    ]);

    if (!room) {
      throw new NotFoundException('Sala não encontrada.');
    }

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return { room, user };
  }
}
