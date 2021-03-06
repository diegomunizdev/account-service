import { Test, TestingModule } from '@nestjs/testing';

import {
  mockAccount,
  mockAccounts,
} from '../../../domain/mocks/account/account.mock';
import { AccountService } from '../../../usecases/services/account/account.service';
import { AccountController } from './account.controller';

describe('AccountController', () => {
  let accountController: AccountController;
  let accountService: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useFactory: () => ({
            getAll: jest.fn(() => mockAccounts),
            getById: jest.fn(() => mockAccount),
          }),
        },
      ],
    }).compile();

    accountController = module.get<AccountController>(AccountController);
    accountService = module.get<AccountService>(AccountService);
  });

  it('should return a account', async () => {
    jest
      .spyOn(accountService, 'getById')
      .mockReturnValueOnce(Promise.resolve(mockAccount));

    const response = await accountController.getById(1);

    expect(accountService.getById).toHaveBeenCalledTimes(1);
    expect(accountService.getById).toHaveBeenCalledWith(1);
    expect(response).toEqual(mockAccount);
  });

  it('should return list of accounts', async () => {
    jest
      .spyOn(accountService, 'getAll')
      .mockReturnValueOnce(Promise.resolve(mockAccounts));

    const response = await accountController.getAll();

    expect(accountService.getAll).toHaveBeenCalledTimes(1);
    expect(accountService.getAll).toHaveBeenCalledWith();
    expect(response).toEqual(mockAccounts);
  });
});
