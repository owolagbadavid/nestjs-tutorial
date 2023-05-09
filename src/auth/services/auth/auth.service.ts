import { Inject, Injectable } from '@nestjs/common';
import type { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  async validateUser(username: string, password: string) {
    const userDB = await this.userService.findUserByUsername(username);
    if (userDB /* && userDB.password === password*/) {
      console.log('userDB', userDB);
      return userDB;
    }
  }
}
