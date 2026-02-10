import { IsNotEmpty, IsString } from 'class-validator';

/**
 * DTOs de eventos websocket.
 */
export class JoinRoomEventDto {
  @IsString()
  @IsNotEmpty()
  roomId!: string;

  @IsString()
  @IsNotEmpty()
  userId!: string;
}

export class SendMessageEventDto {
  @IsString()
  @IsNotEmpty()
  roomId!: string;

  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;
}
