import { ApiProperty } from '@nestjs/swagger';
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
  name: string;

  @ApiProperty({
    example: 'Responsible for managing dev and operations',
    description: 'Team Responsibility',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: ['John Wick', 'Rick Grimes'],
    description: 'Array of team members',
  })
  @IsArray({ each: true })
  @IsOptional()
  members?: string[];

  @IsUUID()
  @IsOptional()
  ownerId?: string;

  @IsString()
  @IsArray({ each: true })
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsOptional()
  avatarUrl?: string;
}
