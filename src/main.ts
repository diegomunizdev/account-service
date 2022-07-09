import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/v1');
  await app.listen(process.env.PORT || 3000);
}

bootstrap().then(() => {
  new Logger('Account Service').log(
    `Application running on http://localhost:${process.env.PORT}/v1`,
  );
});
