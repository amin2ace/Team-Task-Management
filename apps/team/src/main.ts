import { NestFactory } from '@nestjs/core';
import { TeamModule } from './team.module';

async function bootstrap() {
  const app = await NestFactory.create(TeamModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
