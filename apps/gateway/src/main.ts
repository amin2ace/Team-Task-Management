import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { RmqService } from '@app/common';

const configService = new ConfigService();

const logger = new Logger('GateWay Main', { timestamp: true });

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Removes any properties from the incoming request that are not defined in DTO.
    }),
  );

  const port: string = configService.getOrThrow<string>('PORT');

  await swaggerApi(app, port);
  app.startAllMicroservices();

  await app.listen(port, () => {
    logger.debug(`HTTP Gateway started at port ${port}`);
  });
}

async function swaggerApi(app: INestApplication, port: string) {
  const swaggerPath = configService.getOrThrow<string>('SWAGGER_PATH');
  const swaggerUrl = configService.getOrThrow<string>('SWAGGER_SERVER_URL');

  const document = new DocumentBuilder()
    .setTitle('HTTP Gateway')
    .setVersion('0.1')
    // .addServer(`${swaggerUrl}:${port}/${swaggerPath}`)
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, document);

  logger.debug(`Swagger Api initiated at ${swaggerUrl}:${port}/${swaggerPath}`);
  return SwaggerModule.setup(swaggerPath, app, swaggerDocument);
}
bootstrap();
