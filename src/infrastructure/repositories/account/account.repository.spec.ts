import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from '../../../infrastructure/entities/account/account.entity';
import { AccountRepository } from './account.repository';
import { mockAccountRepository } from '../../../domain/mocks/account/account.mock';
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

  it('should return an array of accounts', async () => {
    jest
      .spyOn(accountRepository, 'getAll')
      .mockReturnValueOnce(Promise.resolve(mockAccountRepository));

    const result = await accountRepository.getAll();

    expect(accountRepository.getAll).toHaveBeenCalledTimes(1);
    expect(accountRepository.getAll).toHaveBeenCalledWith();
    expect(result).toEqual(mockAccountRepository);
  });
});
