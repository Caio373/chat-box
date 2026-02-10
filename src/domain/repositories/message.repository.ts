import { Message } from '../entities/message';

/**
 * Contrato de persistência de mensagens.
 */
export interface MessageRepository {
  create(input: {
    roomId: string;
    userId: string;
    userName: string;
    content: string;
    type: string;
  }): Promise<Message>;
  listByRoom(roomId: string): Promise<Message[]>;
}
