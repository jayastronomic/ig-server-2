import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../user/user';
import CreateUserDto from '../user/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';

describe('AuthService', () => {
  let authService: AuthService;

  const mockUserRepository = {
    save: jest.fn(),
  };

  const mockCacheManager = {
    set: jest.fn(),
    get: jest.fn(),
  };

  const mockEmailService = {
    sendOtp: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: 'CACHE_MANAGER',
          useValue: mockCacheManager,
        },
        {
          provide: EmailService,
          useValue: mockEmailService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('With valid data', () => {
    it('should register a new user', async () => {
      // Arrange
      const createUserDto = {
        email: 'test@gmail.com',
        username: 'testUser',
        fullName: 'John Doe',
        password: 'password',
        birthDate: '01-29-1994',
        passcode: '123456'
      } as CreateUserDto;

      const copiedDTo = {
        ...createUserDto
      }

      delete copiedDTo.passcode

      const registeredUser = {
        id: '1bf57e0a-e0b6-4536-be46-5d13702666b0',
        email: 'test@gmail.com',
        username: 'testUser',
        fullName: 'John Doe',
        password:
          '$2b$12$1jyhiD13nKiqN58g0wiVyeQWnlAdb9JthrroSBSVgaXmVDc3P/2Qu',
        birthDate: '01-29-1994',
      } as User;

      const mockBcrypt = {
        hash: jest.fn()
      } 


      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlZDI1Y2UzNi0wZDNlLTRlYzgtYjc4OS1lN2U4ZTQ3OTk2NGUiLCJ1c2VybmFtZSI6InRlbmVTbWl0aCIsImlhdCI6MTcyNzAzNzQ1Nn0.W6pmoEGUKsexbe9V5ShPqvyGbyFvxzVmONuT2GAORIU';

      const payload = {
        sub: registeredUser.id,
        username: registeredUser.username,
      };

      jest.spyOn(mockBcrypt, 'hash').mockReturnValue('$2b$12$1jyhiD13nKiqN58g0wiVyeQWnlAdb9JthrroSBSVgaXmVDc3P/2Qu')
      jest.spyOn(mockUserRepository, 'save').mockReturnValue(registeredUser);
      jest.spyOn(mockJwtService, 'signAsync').mockReturnValue(token);

      // ACT
      const result = await authService['register'](createUserDto);

      // ASSERT
      expect(result).toEqual(token);
      expect(mockUserRepository.save).toHaveBeenCalledWith(copiedDTo);
      expect(mockJwtService.signAsync).toHaveBeenCalledWith(payload);
    });
  });
});
