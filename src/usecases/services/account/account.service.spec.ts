import { Test, TestingModule } from '@nestjs/testing';

import { AccountRepository } from '../../../infrastructure/repositories/account/account.repository';
import { AccountService } from './account.service';
import { AccountMapper } from '../../../domain/mappers/account/account.mapper';
import {
  mockAccountRepository,
  mockAccounts,
} from '../../../domain/mocks/account/account.mock';

describe('AccountService', () => {
  let accountService: AccountService;
  let accountRepository: AccountRepository;
  let accountMapper: AccountMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: AccountRepository,
          useFactory: () => ({
            getAll: jest.fn(() => mockAccountRepository),
          }),
        },
        {
          provide: AccountMapper,
          useFactory: () => ({
            mapAccountsToResponse: jest.fn(() => mockAccounts),
          }),
        },
      ],
    }).compile();

    accountService = module.get<AccountService>(AccountService);
    accountRepository = module.get<AccountRepository>(AccountRepository);
    accountMapper = module.get<AccountMapper>(AccountMapper);
  });

  it('should return list of accounts', async () => {
    jest
      .spyOn(accountRepository, 'getAll')
      .mockReturnValueOnce(Promise.resolve(mockAccountRepository));

    const result = await accountService.getAll();

    expect(accountRepository.getAll).toHaveBeenCalledTimes(1);
    expect(accountRepository.getAll).toHaveBeenLastCalledWith();
    expect(accountMapper.mapAccountsToResponse).toHaveBeenCalledWith(
      mockAccountRepository,
    );
    expect(result).toEqual(mockAccounts);
  });
});
