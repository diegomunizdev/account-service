import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from '../../entities/account/account.entity';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectRepository(Account)
    private readonly _accountRepository: Repository<Account>,
  ) {}

  async getById(id: number): Promise<Account> {
    return await this._accountRepository.findOne({ where: { id } });
  }

  async getAll(): Promise<Account[]> {
    return await this._accountRepository.find();
  }
}
