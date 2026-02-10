/**
 * Entidade de domínio para mensagem.
 *
 * Esta estrutura já suporta evolução para múltiplos tipos de mensagem
 * (texto, imagem, evento de sistema etc.) sem quebrar a interface pública.
 */
export class Message {
  constructor(
    public readonly id: string,
    public readonly roomId: string,
    public readonly userId: string,
    public readonly userName: string,
    public readonly content: string,
    public readonly type: string,
    public readonly createdAt: Date
  ) {}
}
