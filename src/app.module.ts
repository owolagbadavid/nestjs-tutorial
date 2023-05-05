import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './typeorm';

@Module({
  imports: [
    CustomerModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user1',
      password: '12345678',
      entities,
      database: 'tutorial_db',
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
