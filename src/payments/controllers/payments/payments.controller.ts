import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('payments')
export class PaymentsController {
  @Get()
  getPaymnets(@Req() req: Request, @Res() res: Response) {
    console.log('getPaymnets');
    const { count, page } = req.query;

    if (!count || !page) {
      res.status(400).send({ msg: 'count and page are required' });
    } else {
      res.status(200).send({ msg: 'getPaymnets' });
    }
  }
}
