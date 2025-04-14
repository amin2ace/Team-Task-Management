import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'libs/common/.env',
      validationSchema: Joi.object({
        RMQ_URL: Joi.string().required(),
      }),
    }),
  ],
})
export class RmqModule {}
