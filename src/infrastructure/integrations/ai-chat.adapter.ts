import { Injectable } from '@nestjs/common';
import { AIChatAdapter } from 'src/domain/adapters/ai-chat.adapter';

/**
 * Adapter de integração exemplo para IA.
 *
 * Atualmente é um stub deterministicamente controlado para ambiente local.
 * Em produção, pode ser substituído por implementação com OpenAI, Azure OpenAI,
 * ou outro provedor sem alterar os casos de uso.
 */
@Injectable()
export class AIChatAdapterImpl implements AIChatAdapter {
  shouldTriggerAssistant(content: string): boolean {
    return content.toLowerCase().includes('@assistant');
  }

  async generateAssistantReply(input: {
    roomId: string;
    userName: string;
    message: string;
  }): Promise<string | null> {
    const sanitizedMessage = input.message.replace('@assistant', '').trim();

    if (!sanitizedMessage) {
      return `${input.userName}, me diga como posso ajudar.`;
    }

    return `Olá ${input.userName}! (room: ${input.roomId}) Recebi sua mensagem: "${sanitizedMessage}". Esta resposta é gerada pelo AIChatAdapter de exemplo.`;
  }
}
