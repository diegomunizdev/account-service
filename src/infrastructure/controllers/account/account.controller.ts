import { Controller, Get } from '@nestjs/common';

import { AccountResponse } from '../../../domain/responses/account/account.response';
import { AccountService } from '../../../usecases/services/account/account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly _accountService: AccountService) {}

  @Get()
  async getAll(): Promise<AccountResponse[]> {
    return await this._accountService.getAll();
  }
}
