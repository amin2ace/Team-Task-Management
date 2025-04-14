import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GatewayService {
  constructor(protected readonly configServcie: ConfigService) {}

  async getHello(): Promise<string> {
    return this.configServcie.get<string>('PORT') as string;
  }
}
