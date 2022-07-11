import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Account } from '../../entities/account/account.entity';

@Injectable()
export class AccountRepository extends Repository<Account> {
  async getById(id: number): Promise<Account> {
    return await this.findOne({ where: { id } });
  }

  async getAll(): Promise<Account[]> {
    return await this.find();
  }
}
