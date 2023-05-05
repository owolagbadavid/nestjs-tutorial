import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCustomerDto } from 'src/customer/dtos/create-customer.dto';
import { CustomersService } from 'src/customer/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get('')
  getAllCustomers() {
    return this.customersService.getCustomers();
  }

  @Get(':id')
  getCustomer(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customersService.findCustomerById(id);
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.createCustomer(createCustomerDto);
    // console.log(createCustomerDto);
  }
}
