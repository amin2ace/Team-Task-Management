import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateTeamRequestDto, CreateTeamResponseDto } from './dto';

@Injectable()
export class GatewayService {
  constructor(protected readonly configServcie: ConfigService) {}

  async createNewTeam(
    teamData: CreateTeamRequestDto,
  ): Promise<CreateTeamResponseDto> {
    return '';
  }
}
