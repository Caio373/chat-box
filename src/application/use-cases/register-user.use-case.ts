import { Inject, Injectable } from '@nestjs/common';
import { RegisterUserInput } from '../dto/register-user.input';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { USER_REPOSITORY } from 'src/infrastructure/providers/injection-tokens';

/**
 * Caso de uso: cadastro simples de usuário.
 */
@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository
  ) {}

  async execute(input: RegisterUserInput) {
    return this.userRepository.create(input.name.trim());
  }
}
