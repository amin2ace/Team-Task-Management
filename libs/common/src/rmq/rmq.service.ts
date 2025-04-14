import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RmqService {
  constructor(protected readonly configService: ConfigService) {}

  async getOptions(queue: string, noAck = false): Promise<RmqOptions> {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.getOrThrow<string>('RABBITMQ_URL')],
        queue: this.configService.getOrThrow<string>(`RABBITMQ_${queue}_QUEUE`),
        noAck,
      },
    };
  }
}
