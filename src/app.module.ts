import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RestModule } from './infrastructure/modules/v1/rest.module';

@Module({
  imports: [ConfigModule.forRoot(), RestModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
