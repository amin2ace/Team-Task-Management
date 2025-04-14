import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RmqService {
  constructor(protected readonly configService: ConfigService) {}
}
