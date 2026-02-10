import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterUserUseCase } from 'src/application/use-cases/register-user.use-case';
import { CreateUserRequestDto } from '../dto/create-user.request';

/**
 * Controller HTTP de usuários.
 */
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar usuário' })
  async create(@Body() body: CreateUserRequestDto) {
    return this.registerUserUseCase.execute({ name: body.name });
  }
}
