import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/typeorm';
import { UsersService } from 'src/users/services/users/users.service';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {
    super();
  }

  serializeUser(user: any, done: (err, user: User) => void) {
    console.log('serializeUser', user);

    done(null, user);
  }

  async deserializeUser(payload: any, done: { (err, user: User): void }) {
    console.log('deserializeUser', payload);

    const userDB = await this.userService.findUserById(payload.id);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
