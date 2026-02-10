/**
 * Porta para integração com assistentes de IA.
 *
 * Atualmente usada como stub para demonstrar desacoplamento.
 */
export interface AIChatAdapter {
  shouldTriggerAssistant(content: string): boolean;
  generateAssistantReply(input: {
    roomId: string;
    userName: string;
    message: string;
  }): Promise<string | null>;
}
