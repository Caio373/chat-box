import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { CreateRoomUseCase } from './application/use-cases/create-room.use-case';
import { SendMessageUseCase } from './application/use-cases/send-message.use-case';
import { JoinRoomUseCase } from './application/use-cases/join-room.use-case';
import { ListRoomMessagesUseCase } from './application/use-cases/list-room-messages.use-case';
import { UserEntity } from './infrastructure/database/typeorm/entities/user.entity';
import { RoomEntity } from './infrastructure/database/typeorm/entities/room.entity';
import { MessageEntity } from './infrastructure/database/typeorm/entities/message.entity';
import { TypeOrmUserRepository } from './infrastructure/database/typeorm/repositories/typeorm-user.repository';
import { TypeOrmRoomRepository } from './infrastructure/database/typeorm/repositories/typeorm-room.repository';
import { TypeOrmMessageRepository } from './infrastructure/database/typeorm/repositories/typeorm-message.repository';
import { AIChatAdapterImpl } from './infrastructure/integrations/ai-chat.adapter';
import { USER_REPOSITORY, ROOM_REPOSITORY, MESSAGE_REPOSITORY, AI_CHAT_ADAPTER } from './infrastructure/providers/injection-tokens';
import { UserController } from './interfaces/http/controllers/user.controller';
import { RoomController } from './interfaces/http/controllers/room.controller';
import { ChatGateway } from './interfaces/websocket/gateways/chat.gateway';
import { ChatPolicyService } from './domain/services/chat-policy.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'chat.db',
      entities: [UserEntity, RoomEntity, MessageEntity],
      synchronize: true
    }),
    TypeOrmModule.forFeature([UserEntity, RoomEntity, MessageEntity])
  ],
  controllers: [UserController, RoomController],
  providers: [
    RegisterUserUseCase,
    CreateRoomUseCase,
    JoinRoomUseCase,
    SendMessageUseCase,
    ListRoomMessagesUseCase,
    ChatPolicyService,
    ChatGateway,
    { provide: USER_REPOSITORY, useClass: TypeOrmUserRepository },
    { provide: ROOM_REPOSITORY, useClass: TypeOrmRoomRepository },
    { provide: MESSAGE_REPOSITORY, useClass: TypeOrmMessageRepository },
    { provide: AI_CHAT_ADAPTER, useClass: AIChatAdapterImpl }
  ]
})
export class AppModule {}
@Module({
  providers: [ChatGateway],
})
export class WebsocketModule {}

