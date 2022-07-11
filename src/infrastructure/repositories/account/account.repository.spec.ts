import { Test, TestingModule } from '@nestjs/testing';

import { AccountRepository } from './account.repository';
import {
  mockAccount,
  mockAccountsRepository,
} from '../../../domain/mocks/account/account.mock';

describe('AccountRepository', () => {
  let accountRepository: AccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountRepository],
    }).compile();

    accountRepository = module.get<AccountRepository>(AccountRepository);
  });

  it('should be defined', () => {
    expect(accountRepository).toBeDefined();
  });

  it('should return a account', async () => {
    jest
      .spyOn(accountRepository, 'findOne')
      .mockReturnValueOnce(Promise.resolve(mockAccount));

    const result = await accountRepository.getById(1);

    expect(accountRepository.findOne).toHaveBeenCalledTimes(1);
    expect(accountRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockAccount);
  });

  it('should return an array of accounts', async () => {
    jest
      .spyOn(accountRepository, 'find')
      .mockReturnValueOnce(Promise.resolve(mockAccountsRepository));

    const result = await accountRepository.getAll();

    expect(accountRepository.find).toHaveBeenCalledTimes(1);
    expect(accountRepository.find).toHaveBeenCalledWith();
    expect(result).toEqual(mockAccountsRepository);
  });
});
