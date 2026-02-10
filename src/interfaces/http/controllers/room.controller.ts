import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateRoomUseCase } from 'src/application/use-cases/create-room.use-case';
import { JoinRoomUseCase } from 'src/application/use-cases/join-room.use-case';
import { ListRoomMessagesUseCase } from 'src/application/use-cases/list-room-messages.use-case';
import { CreateRoomRequestDto } from '../dto/create-room.request';

/**
 * Controller HTTP de salas.
 */
@ApiTags('rooms')
@Controller('rooms')
export class RoomController {
  constructor(
    private readonly createRoomUseCase: CreateRoomUseCase,
    private readonly joinRoomUseCase: JoinRoomUseCase,
    private readonly listRoomMessagesUseCase: ListRoomMessagesUseCase
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar sala' })
  async create(@Body() body: CreateRoomRequestDto) {
    return this.createRoomUseCase.execute({ name: body.name });
  }

  @Post(':roomId/join/:userId')
  @ApiOperation({ summary: 'Entrar em uma sala' })
  @ApiParam({ name: 'roomId' })
  @ApiParam({ name: 'userId' })
  async join(@Param('roomId') roomId: string, @Param('userId') userId: string) {
    return this.joinRoomUseCase.execute({ roomId, userId });
  }

  @Get(':roomId/messages')
  @ApiOperation({ summary: 'Listar histórico de mensagens de uma sala' })
  @ApiParam({ name: 'roomId' })
  async listMessages(@Param('roomId') roomId: string) {
    return this.listRoomMessagesUseCase.execute(roomId);
  }
}
