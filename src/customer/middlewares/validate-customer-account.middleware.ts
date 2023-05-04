import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCustomerAccountMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      'inside the idldle wahg checks if the customer is valid verified',
    );
    const { validaccount } = req.headers;
    if (validaccount) return next();

    next(new UnauthorizedException('Account is invalid'));
  }
}
