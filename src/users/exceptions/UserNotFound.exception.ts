import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(msg?: string, status?: number) {
    super(msg || 'User Not Found', status || HttpStatus.BAD_REQUEST);
  }
}
