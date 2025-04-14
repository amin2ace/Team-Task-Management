import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

const configService = new ConfigService();
const logger = new Logger('GateWay Main', { timestamp: true });
async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  const port: number = configService.getOrThrow<number>('PORT');

  await app.listen(port, () => {
    logger.log(`HTTP Gateway started at port ${port}`);
  });
}
bootstrap();
