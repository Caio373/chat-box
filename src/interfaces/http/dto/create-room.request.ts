import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateRoomRequestDto {
  @ApiProperty({ example: 'general' })
  @IsNotEmpty()
  @MaxLength(80)
  name!: string;
}
