import { Account } from '../../../infrastructure/entities/account/account.entity';
import { AccountResponse } from '../../responses/account/account.response';

export class AccountsMapper {
  mapAccountToResponse(account: Account): AccountResponse {
    return {
      id: account.id,
      name: account.name,
      email: account.email,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };
  }

  mapAccountsToResponse(account: Account[]): AccountResponse[] {
    return account.map((account: Account) =>
      this.mapAccountToResponse(account),
    );
  }
}
