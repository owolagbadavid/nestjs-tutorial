import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CustomerModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
