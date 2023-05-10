import { Controller, Get, Post, Req, Session, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import {
  AuthenticatedGuard,
  LocalAuthGuard,
} from '../../../auth/utils/local-guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login() {
    console.log('inside auth controller');
  }

  @Get('')
  async getAuthSess(@Session() session: Record<string, any>) {
    console.log('session', session);
    console.log(session.id);
    session.authenticated = true;
    return session;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  async getAuthStatus(@Req() req: Request) {
    return req.user;
  }
}
