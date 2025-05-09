import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule } from '@nestjs/microservices';
import { RmqTeamService } from './rmq/rmq-team.service';
import path, { join } from 'path';
import { RmqTaskService } from './rmq/rmq-task.service';

@Module({
  imports: [
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          inject: [ConfigService],
          name: RmqTeamService.name,
          useClass: RmqTeamService,
        },
        {
          inject: [ConfigService],
          name: RmqTaskService.name,
          useClass: RmqTaskService,
        },
      ],
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), 'apps', 'gateway', '.env.development'),
      validationSchema: Joi.object({
        // App Variables
        PORT: Joi.string().required(),

        // Swagger Variables
        SWAGGER_PATH: Joi.string().required(),
        SWAGGER_SERVER_URL: Joi.string().required(),

        // RabbitMq Variables
        RABBITMQ_URL: Joi.string().required(),
        RABBITMQ_TEAM_QUEUE: Joi.string().required(),
        RABBITMQ_TASK_QUEUE: Joi.string().required(),

        // DataBase
        GATEWAY_DB_NAME: Joi.string().required(),
        GATEWAY_DB_URI: Joi.string().required(),
      }),
    }),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
