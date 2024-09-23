import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import CreateUserDto from 'src/user/create-user.dto';
import User from '../user/user';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import InvalidPasscodeException from '../exceptions/invalid-passcode-exception';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  public async isAuthenticated(headers: any) {
    const [_, token] = headers.authorization?.split(' ');
    const payload = await this.jwtService.verifyAsync(token);
    return await this.userRepository.findOne({ where: { id: payload.sub}})
  }

  public async verifyEmail(createUserDto: CreateUserDto) {
    const cached_passcode = await this.cacheManager.get(createUserDto.email);
    if (cached_passcode !== createUserDto.passcode)
      throw new InvalidPasscodeException();
    return this.register(createUserDto);
  }

  public async sendOtpEmail(email: string) {
    return this.emailService.sendOtp(email);
  }

  private async register(createUserDto: CreateUserDto): Promise<string> {
    const copiedDTo = { ...createUserDto };
    delete copiedDTo.passcode;
    const hashedPassword = await bcrypt.hash(copiedDTo.password, 12);
    copiedDTo.password = hashedPassword;
    const user = await this.userRepository.save(copiedDTo);
    const payload = { sub: user.id, username: user.username };
    return this.jwtService.signAsync(payload);
  }
}
