import { Controller, Get } from '@nestjs/common';
import { TeamService } from './team.service';

@Controller()
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  getHello(): string {
    return this.teamService.getHello();
  }
}
