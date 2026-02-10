import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {

  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: string,
  ) {
    this.server.emit('message', message);
  }
}
