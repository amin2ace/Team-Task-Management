import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import { RmqService } from '@app/common';

const config = new ConfigService();

const logger = new Logger('GateWay Main', { timestamp: true });

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule, { bufferLogs: false });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Removes any properties from the incoming request that are not defined in DTO.
    }),
  );

  const port: string = config.getOrThrow<string>('PORT');

  app.startAllMicroservices();
  app.useLogger(new Logger());

  await swaggerApi(app, port);
  await app.listen(port, () => {
    logger.debug(`HTTP Gateway started at port ${port}`);
  });
}

async function swaggerApi(app: INestApplication, port: string) {
  const swaggerPath = config.getOrThrow<string>('SWAGGER_PATH');
  const swaggerUrl = config.getOrThrow<string>('SWAGGER_SERVER_URL');

  const document = new DocumentBuilder()
    .setTitle('HTTP Gateway')
    .setVersion('0.1')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, document);

  logger.debug(`Swagger Api initiated at ${swaggerUrl}:${port}/${swaggerPath}`);
  return SwaggerModule.setup(swaggerPath, app, swaggerDocument);
}
bootstrap();
