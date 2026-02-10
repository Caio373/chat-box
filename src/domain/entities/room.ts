/**
 * Entidade de domínio para sala de chat.
 */
export class Room {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly createdAt: Date
  ) {}
}
