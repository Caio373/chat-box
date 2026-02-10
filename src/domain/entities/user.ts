/**
 * Entidade de domínio para usuário.
 *
 * Regra: domínio não conhece Nest, TypeORM ou Socket.IO.
 */
export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly createdAt: Date
  ) {}
}
