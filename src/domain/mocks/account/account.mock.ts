import { Account } from '../../../infrastructure/entities/account/account.entity';
import { AccountResponse } from '../../responses/account/account.response';

export const mockAccountRepository: Account[] = [
  {
    id: '1',
    name: 'name',
    email: 'email',
    password: 'password',
    createdAt: new Date('2022-07-09T04:20:04.835Z'),
    updatedAt: new Date('2022-07-09T04:20:04.835Z'),
  },
];

export const mockAccount: any = {
  id: '1',
  name: 'name',
  email: 'email',
  createdAt: new Date('2022-07-09T04:20:04.835Z'),
  updatedAt: new Date('2022-07-09T04:20:04.835Z'),
};

export const mockAccounts: AccountResponse[] = [
  mockAccount,
  mockAccount,
  mockAccount,
];
