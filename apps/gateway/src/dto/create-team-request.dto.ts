import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTeamRequestDto {
  @ApiProperty({ example: 'DevOps', description: 'Team name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 'Responsible for managing dev and operations',
    description: 'Team Responsibility',
  })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({
    example: ['John Wick', 'Rick Grimes'],
    description: 'Array of team members',
  })
  @IsArray()
  readonly members: string[];

  @ApiProperty({
    example: '3465484d-9f56-4139-b4a5-3c2fcb13cf55',
    description: 'Team owner ID',
  })
  @IsUUID()
  readonly ownerId: string;

  @ApiProperty({
    example: ['development', 'operation'],
  })
  @IsArray()
  readonly tags: string[];

  @ApiProperty()
  @IsString()
  readonly avatarUrl: string;
}
