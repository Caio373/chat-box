import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { User } from 'src/domain/entities/user';
import { UserEntity } from '../entities/user.entity';

/**
 * Implementação concreta do contrato de usuário com TypeORM.
 */
@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async create(name: string): Promise<User> {
    const user = this.userRepository.create({
      id: uuidv4(),
      name
    });

    const savedUser = await this.userRepository.save(user);
    return new User(savedUser.id, savedUser.name, savedUser.createdAt);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;

    return new User(user.id, user.name, user.createdAt);
  }
}
