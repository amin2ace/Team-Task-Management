import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProvider,
  ClientsModuleOptionsFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class RmqTeamService implements ClientsModuleOptionsFactory {
  constructor(protected readonly config: ConfigService) {}

  createClientOptions(): ClientProvider {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.config.getOrThrow<string>('RABBITMQ_URL')],
        queue: this.config.getOrThrow<string>(`RABBITMQ_TEAM_QUEUE`),
        queueOptions: {
          durable: false,
        },
      },
    };
  }
}
