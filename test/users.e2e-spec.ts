import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UsersControlerr e2e test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  describe('create user /api/users/create POST', () => {
    const CREATE_USER_URL = '/api/users/create';
    it('should create user', () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          username: 'ansonanson',
          password: 'secretsecret',
          email: 'anson@gmail.com',
        })
        .expect(201);
    });

    it('should return 400 if invalid username is provided', () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          username: 'an',
          password: 'secretsecret',
          email: 'anson@gmail.com',
        })
        .expect(400);
    });

    it('should return 400 if invalid password is provided', () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          username: 'ansonnestjs',
          password: 'secre',
          email: 'anson@gmail.com',
        })
        .expect(400);
    });

    it('should return 400 if invalid email is provided', () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          username: 'anson',
          password: 'secretsecret',
          email: 'anson',
        })
        .expect(400);
    });
  });
});
