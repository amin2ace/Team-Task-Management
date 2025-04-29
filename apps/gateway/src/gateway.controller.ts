import { Body, Controller, Get, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { CreateTeamRequestDto, CreateTeamResponseDto } from './dto';
import { Serialize } from './interceptor/serialize.interceptor';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Serialize(CreateTeamResponseDto)
  @Post('/create_team')
  async createNewTeam(@Body() teamData: CreateTeamRequestDto) {
    return this.gatewayService.createNewTeam(teamData);
  }
}
