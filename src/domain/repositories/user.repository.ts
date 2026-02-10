import { User } from '../entities/user';

/**
 * Contrato de persistência de usuários.
 */
export interface UserRepository {
  create(name: string): Promise<User>;
  findById(id: string): Promise<User | null>;
}
