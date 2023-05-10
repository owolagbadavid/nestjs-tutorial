import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../typeorm';
import { Repository } from 'typeorm';
import * as bcryptUtils from '../../../utils/bcrypt';
import e from 'express';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  const USER_REPO_TOKEN = getRepositoryToken(User);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPO_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(USER_REPO_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    jest.spyOn(bcryptUtils, 'encodePassword').mockResolvedValue('hash123');
    it('should encode password correctly', async () => {
      await service.createUser({
        username: 'anson',
        password: 'secret',
        email: 'mike@gmail.com',
      });
      expect(bcryptUtils.encodePassword).toHaveBeenCalledWith('secret');
    });
    it('should call userRepository.create with correct params', async () => {
      jest.spyOn(userRepository, 'create').mockReturnValue({
        username: 'anson',
        password: 'hash123',
        email: 'mike@gmail.com',
        id: 1,
      });
      await service.createUser({
        username: 'anson',
        password: 'secret',
        email: 'mike@gmail.com',
      });
      expect(userRepository.save).toHaveBeenCalledWith({
        username: 'anson',
        password: 'hash123',
        email: 'mike@gmail.com',
        id: 1,
      });
      expect(userRepository.create);
    });
  });
});
