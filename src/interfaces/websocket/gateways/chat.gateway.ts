import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JoinRoomUseCase } from 'src/application/use-cases/join-room.use-case';
import { SendMessageUseCase } from 'src/application/use-cases/send-message.use-case';
import { JoinRoomEventDto, SendMessageEventDto } from '../dto/chat-events.dto';

/**
 * Gateway Socket.IO para comunicação em tempo real.
 */
@WebSocketGateway({
  cors: { origin: '*' }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(ChatGateway.name);

  constructor(
    private readonly joinRoomUseCase: JoinRoomUseCase,
    private readonly sendMessageUseCase: SendMessageUseCase
  ) {}

  handleConnection(client: Socket): void {
    this.logger.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('room:join')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async onJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() payload: JoinRoomEventDto) {
    const joined = await this.joinRoomUseCase.execute(payload);
    client.join(payload.roomId);

    this.server.to(payload.roomId).emit('room:user-joined', {
      roomId: payload.roomId,
      userId: payload.userId,
      userName: joined.user.name,
      joinedAt: new Date().toISOString()
    });

    return { ok: true };
  }

  @SubscribeMessage('message:send')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async onSendMessage(@MessageBody() payload: SendMessageEventDto) {
    const result = await this.sendMessageUseCase.execute(payload);

    this.server.to(payload.roomId).emit('message:new', result.userMessage);

    if (result.assistantMessage) {
      this.server.to(payload.roomId).emit('message:new', result.assistantMessage);
    }

    return { ok: true };
  }
}
