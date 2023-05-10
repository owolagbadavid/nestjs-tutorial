import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

import * as sesssion from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';

import { SessionEntity } from '../src/typeorm';

import { dataSource } from '../src/typeorm/datasource';

describe('UsersControlerr e2e test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');

    await dataSource.initialize();
    const repo = dataSource.getRepository(SessionEntity);

    app.use(
      sesssion({
        name: 'session',
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 },
        store: new TypeormStore({
          cleanupLimit: 2,
          limitSubquery: false, // If using MariaDB.
          ttl: 86400,
        }).connect(repo),
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
    await app.init();
  });

  describe('Authentication', () => {
    const URL = '/api/auth/login';
    let cookie: string;
    it('should login ', (done) => {
      request(app.getHttpServer())
        .post(URL)
        .send({
          username: 'testuser',
          password: 'secretsecret',
        })
        .expect(201)
        .end((err, res) => {
          console.log(res.headers);
          cookie = res.headers['set-cookie'];
          done();
        });
    });

    it('/users (GET) should return 200', () => {
      return request(app.getHttpServer())
        .get('/api/users')
        .set('Cookie', cookie)
        .expect(200);
    });
  });
});
