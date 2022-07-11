import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from '../../../infrastructure/entities/account/account.entity';
import { AccountRepository } from './account.repository';
import {
  mockAccount,
  mockAccountsRepository,
} from '../../../domain/mocks/account/account.mock';
import { connectionDatabase } from '../../../infrastructure/config/database/database';

describe('AccountRepository', () => {
  let accountRepository: AccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([Account]),
        TypeOrmModule.forRoot(connectionDatabase),
      ],
      providers: [AccountRepository, Repository],
    }).compile();

    accountRepository = module.get<AccountRepository>(AccountRepository);
  });

  it('should be defined', () => {
    expect(accountRepository).toBeDefined();
  });

  it('should return a account', async () => {
    jest
      .spyOn(accountRepository, 'getById')
      .mockReturnValueOnce(Promise.resolve(mockAccount));

    const result = await accountRepository.getById(1);

    expect(accountRepository.getById).toHaveBeenCalledTimes(1);
    expect(accountRepository.getById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockAccount);
  });

  it('should return an array of accounts', async () => {
    jest
      .spyOn(accountRepository, 'getAll')
      .mockReturnValueOnce(Promise.resolve(mockAccountsRepository));

    const result = await accountRepository.getAll();

    expect(accountRepository.getAll).toHaveBeenCalledTimes(1);
    expect(accountRepository.getAll).toHaveBeenCalledWith();
    expect(result).toEqual(mockAccountsRepository);
  });
});
