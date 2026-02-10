import { Injectable } from '@nestjs/common';

/**
 * Serviço de domínio para regras de negócio puras de chat.
 */
@Injectable()
export class ChatPolicyService {
  validateMessageContent(content: string): void {
    if (!content || content.trim().length === 0) {
      throw new Error('A mensagem não pode ser vazia.');
    }

    if (content.length > 1000) {
      throw new Error('A mensagem deve ter no máximo 1000 caracteres.');
    }
  }
}
