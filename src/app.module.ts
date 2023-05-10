import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

import { dataSourceOptions } from './typeorm/datasource';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    CustomerModule,
    UsersModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
