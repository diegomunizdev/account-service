import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../../src/app.module';

describe('Account (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('(GET getById) /account/:id', async () => {
    await request(app.getHttpServer())
      .get('/account/1')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it('(GET getAll) /account', async () => {
    await request(app.getHttpServer())
      .get('/account')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
