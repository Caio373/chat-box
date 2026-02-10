import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({ example: 'Maria' })
  @IsNotEmpty()
  @MaxLength(80)
  name!: string;
}
