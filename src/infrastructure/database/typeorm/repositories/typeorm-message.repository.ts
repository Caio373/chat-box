import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { MessageRepository } from 'src/domain/repositories/message.repository';
import { Message } from 'src/domain/entities/message';
import { MessageEntity } from '../entities/message.entity';

/**
 * Implementação concreta do contrato de mensagem com TypeORM.
 */
@Injectable()
export class TypeOrmMessageRepository implements MessageRepository {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>
  ) {}

  async create(input: {
    roomId: string;
    userId: string;
    userName: string;
    content: string;
    type: string;
  }): Promise<Message> {
    const message = this.messageRepository.create({
      id: uuidv4(),
      ...input
    });

    const savedMessage = await this.messageRepository.save(message);

    return new Message(
      savedMessage.id,
      savedMessage.roomId,
      savedMessage.userId,
      savedMessage.userName,
      savedMessage.content,
      savedMessage.type,
      savedMessage.createdAt
    );
  }

  async listByRoom(roomId: string): Promise<Message[]> {
    const rows = await this.messageRepository.find({
      where: { roomId },
      order: { createdAt: 'ASC' }
    });

    return rows.map(
      (row) => new Message(row.id, row.roomId, row.userId, row.userName, row.content, row.type, row.createdAt)
    );
  }
}
