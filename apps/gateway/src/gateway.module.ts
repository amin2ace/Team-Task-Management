import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule } from '@nestjs/microservices';
import { RmqService } from './rmq.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmOptions } from './typeorm.options';
import path from 'path';
// import { RmqModule } from '@app/common';

@Module({
  imports: [
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          inject: [ConfigService],
          name: 'GatewayService.name',
          useClass: RmqService,
        },
      ],
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(__dirname, '..', `.env.${process.env.NODE_ENV}`),
      validationSchema: Joi.object({
        // App Variables
        PORT: Joi.string().required(),

        // Swagger Variables
        SWAGGER_PATH: Joi.string().required(),
        SWAGGER_SERVER_URL: Joi.string().required(),

        // RabbitMq Variables
        RABBITMQ_URL: Joi.string().required(),
        RABBITMQ_SERVICE_QUEUE: Joi.string().required(),
      }),
    }),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
