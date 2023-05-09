import { Inject, Injectable } from '@nestjs/common';
import type { UsersService } from 'src/users/services/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  async validateUser(username: string, password: string) {
    console.log('mike');

    const userDB = await this.userService.findUserByUsername(username);
    console.log('userDB', userDB);
    if (userDB) {
      const matched = comparePasswords(password, userDB.password);
      if (matched) {
        console.log('vaidation success');
        return userDB;
      }
    }
    console.log('validation failed');
  }
}
