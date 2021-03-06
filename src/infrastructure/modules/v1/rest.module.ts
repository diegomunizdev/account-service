import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AccountsMapper } from '../../../domain/mappers/account/accounts.mapper';
import { AccountController } from '../../controllers/account/account.controller';
import { Account } from '../../entities/account/account.entity';
import { AccountRepository } from '../../repositories/account/account.repository';
import { AccountService } from '../../../usecases/services/account/account.service';
import { connectionDatabase } from '../../config/database/database';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Account]),
    TypeOrmModule.forRoot(connectionDatabase),
  ],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository, AccountsMapper, Repository],
})
export class RestModule {}
