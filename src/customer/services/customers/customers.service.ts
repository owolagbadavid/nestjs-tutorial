import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customer/dtos/create-customer.dto';

import { Customer } from 'src/customer/types/customer';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      email: 'danny@gmail.com',
      name: 'daniel',
    },
    {
      id: 2,
      email: 'john@gmail.com',
      name: 'john',
    },
    { id: 3, email: 'mike@gmail.com', name: 'mike ' },
  ];

  findCustomerById(id: number) {
    return this.customers.find((user) => user.id === id);
  }

  createCustomer(customerDto: CreateCustomerDto) {
    this.customers.push(customerDto);
  }

  getCustomers() {
    return this.customers;
  }
}
