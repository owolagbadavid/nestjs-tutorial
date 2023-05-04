import { Exclude } from 'class-transformer';

export interface User {
  id: number;
  username: string;
  password: string;
}

export class SerializedUser {
  username: string;
  id: number;

  @Exclude()
  password: string;
  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
