import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SendMessageInput } from '../dto/send-message.input';
import {
  AI_CHAT_ADAPTER,
  MESSAGE_REPOSITORY,
  ROOM_REPOSITORY,
  USER_REPOSITORY
} from 'src/infrastructure/providers/injection-tokens';
import { MessageRepository } from 'src/domain/repositories/message.repository';
import { RoomRepository } from 'src/domain/repositories/room.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { AIChatAdapter } from 'src/domain/adapters/ai-chat.adapter';
import { ChatPolicyService } from 'src/domain/services/chat-policy.service';

/**
 * Caso de uso central de mensagens.
 *
 * Decisão arquitetural:
 * - Persiste a mensagem antes de publicar no websocket.
 * - Mantém integração com IA desacoplada via porta (adapter pattern).
 */
@Injectable()
export class SendMessageUseCase {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepository,
    @Inject(ROOM_REPOSITORY)
    private readonly roomRepository: RoomRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(AI_CHAT_ADAPTER)
    private readonly aiChatAdapter: AIChatAdapter,
    private readonly chatPolicyService: ChatPolicyService
  ) {}

  async execute(input: SendMessageInput) {
    this.chatPolicyService.validateMessageContent(input.content);

    const [room, user] = await Promise.all([
      this.roomRepository.findById(input.roomId),
      this.userRepository.findById(input.userId)
    ]);

    if (!room) throw new NotFoundException('Sala não encontrada.');
    if (!user) throw new NotFoundException('Usuário não encontrado.');

    const userMessage = await this.messageRepository.create({
      roomId: room.id,
      userId: user.id,
      userName: user.name,
      content: input.content,
      type: 'USER_TEXT'
    });

    let assistantMessage = null;
    if (this.aiChatAdapter.shouldTriggerAssistant(input.content)) {
      const assistantReply = await this.aiChatAdapter.generateAssistantReply({
        roomId: room.id,
        userName: user.name,
        message: input.content
      });

      if (assistantReply) {
        assistantMessage = await this.messageRepository.create({
          roomId: room.id,
          userId: 'assistant-system',
          userName: 'Assistant',
          content: assistantReply,
          type: 'ASSISTANT_TEXT'
        });
      }
    }

    return {
      userMessage,
      assistantMessage
    };
  }
}
