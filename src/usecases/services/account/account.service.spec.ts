import { Test, TestingModule } from '@nestjs/testing';

import { AccountRepository } from '../../../infrastructure/repositories/account/account.repository';
import { AccountService } from './account.service';
import { AccountsMapper } from '../../../domain/mappers/account/accounts.mapper';
import {
  mockAccountsRepository,
  mockAccounts,
  mockAccountRepository,
  mockAccount,
} from '../../../domain/mocks/account/account.mock';

describe('AccountService', () => {
  let accountService: AccountService;
  let accountRepository: AccountRepository;
  let accountMapper: AccountsMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: AccountRepository,
          useFactory: () => ({
            getAll: jest.fn(() => mockAccountsRepository),
            getById: jest.fn(() => mockAccountRepository),
          }),
        },
        {
          provide: AccountsMapper,
          useFactory: () => ({
            mapAccountsToResponse: jest.fn(() => mockAccounts),
            mapAccountToResponse: jest.fn(() => mockAccount),
          }),
        },
      ],
    }).compile();

    accountService = module.get<AccountService>(AccountService);
    accountRepository = module.get<AccountRepository>(AccountRepository);
    accountMapper = module.get<AccountsMapper>(AccountsMapper);
  });

  it('should return a account', async () => {
    jest
      .spyOn(accountRepository, 'getById')
      .mockReturnValueOnce(Promise.resolve(mockAccountRepository));

    const result = await accountService.getById(1);

    expect(accountRepository.getById).toHaveBeenCalledTimes(1);
    expect(accountMapper.mapAccountToResponse).toHaveBeenCalledWith(
      mockAccountRepository,
    );
    expect(result).toEqual(mockAccount);
  });

  it('should return list of accounts', async () => {
    jest
      .spyOn(accountRepository, 'getAll')
      .mockReturnValueOnce(Promise.resolve(mockAccountsRepository));

    const result = await accountService.getAll();

    expect(accountRepository.getAll).toHaveBeenCalledTimes(1);
    expect(accountRepository.getAll).toHaveBeenLastCalledWith();
    expect(accountMapper.mapAccountsToResponse).toHaveBeenCalledWith(
      mockAccountsRepository,
    );
    expect(result).toEqual(mockAccounts);
  });
});
