import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as sesssion from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';

import { SessionEntity } from './typeorm';

// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { dataSource } from './typeorm/datasource';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await dataSource.initialize();
  const repo = dataSource.getRepository(SessionEntity);

  console.log(repo);

  // const repo = app.get<Repository<SessionEntity>>(
  //   getRepositoryToken(SessionEntity),
  // );

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
  await app.listen(3001);
}
bootstrap();
