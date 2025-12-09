import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from '../auth/guard/roles.guard';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity'; 
import { NotFoundException } from '@nestjs/common';
import { UserRole } from '../../common/enums/user-role.enum';

// Mock de UsersService
const mockUsersService = {
  create: jest.fn(),
  findByEmail: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,  // Mockeamos JwtService
          useValue: {
            sign: jest.fn().mockReturnValue('mocked_token'),
            verify: jest.fn().mockReturnValue({ sub: 1, email: 'user@mail.com', role: 'client' }),
          },
        },
        RolesGuard,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = { email: 'test@mail.com', password: 'test1234', full_name: 'Test User', role: UserRole.CLIENT };
    mockUsersService.create.mockResolvedValue(createUserDto);
    const result = await controller.create(createUserDto);
    expect(result).toEqual(createUserDto);
  });

  it('should return an array of users', async () => {
    const usersArray = [
      { id_user: 1, email: 'test@mail.com', full_name: 'Test User', role: UserRole.CLIENT },
    ];
    mockUsersService.findAll.mockResolvedValue(usersArray);
    const result = await controller.findAll();
    expect(result).toEqual(usersArray);
  });

  it('should return a user by id', async () => {
    const user = { id_user: 1, email: 'test@mail.com', full_name: 'Test User', role: UserRole.CLIENT };
    mockUsersService.findOne.mockResolvedValue(user);
    const result = await controller.findOne(1);
    expect(result).toEqual(user);
  });

  it('should throw a NotFoundException if user is not found', async () => {
    mockUsersService.findOne.mockRejectedValue(new NotFoundException('User not found'));
    await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);
  });
});
