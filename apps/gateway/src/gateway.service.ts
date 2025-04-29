import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateTeamRequestDto, CreateTeamResponseDto } from './dto';
import { ClientProxy } from '@nestjs/microservices';
import { RmqTeamService } from './rmq/rmq-team.service';

@Injectable()
export class GatewayService {
  constructor(
    protected readonly configServcie: ConfigService,
    @Inject(RmqTeamService.name) private readonly client: ClientProxy,
  ) {}

  protected logger = new Logger(GatewayService.name);
  async createNewTeam(teamData: CreateTeamRequestDto) {
    await this.client.emit('team.create', teamData);

    this.logger.debug(`${teamData} was sent`);
    return teamData;
  }
}
