import { Injectable } from '@nestjs/common';

import { AccountsMapper } from '../../../domain/mappers/account/accounts.mapper';
import { AccountResponse } from '../../../domain/responses/account/account.response';
import { AccountRepository } from '../../../infrastructure/repositories/account/account.repository';

@Injectable()
export class AccountService {
  constructor(
    private readonly _accountRepository: AccountRepository,
    private readonly _accountsMapper: AccountsMapper,
  ) {}

  async getById(id: number): Promise<AccountResponse> {
    const result = await this._accountRepository.getById(id);
    return this._accountsMapper.mapAccountToResponse(result);
  }

  async getAll(): Promise<AccountResponse[]> {
    const result = await this._accountRepository.getAll();
    return this._accountsMapper.mapAccountsToResponse(result);
  }
}
