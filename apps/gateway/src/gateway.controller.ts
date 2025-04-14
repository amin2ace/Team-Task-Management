import { Body, Controller, Get, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { CreateTeamRequestDto, CreateTeamResponseDto } from './dto';

@Controller('/')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('/team/create')
  async createNewTeam(
    @Body() teamData: CreateTeamRequestDto,
  ): Promise<CreateTeamResponseDto> {
    return this.gatewayService.createNewTeam(teamData);
  }
}
