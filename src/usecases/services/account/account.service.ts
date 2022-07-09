import { Injectable } from '@nestjs/common';

import { AccountMapper } from '../../../domain/mappers/account/account.mapper';
import { AccountResponse } from '../../../domain/responses/account/account.response';
import { AccountRepository } from '../../../infrastructure/repositories/account/account.repository';

@Injectable()
export class AccountService {
  constructor(
    private readonly _accountRepository: AccountRepository,
    private readonly _accountMapper: AccountMapper,
  ) {}

  async getAll(): Promise<AccountResponse[]> {
    const result = await this._accountRepository.getAll();
    return this._accountMapper.mapAccountsToResponse(result);
  }
}
