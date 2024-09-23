import { MailerService } from '@nestjs-modules/mailer';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}
  public async sendOtp(email: string) {
    const otp = await this.generateOtp(email);
    await this.mailerService.sendMail({
      from: 'no-reply@test.com',
      to: email,
      subject: `One-Time Passcode`,
      text: otp,
    });
    return email;
  }

  private async generateOtp(email: string): Promise<string> {
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    await this.cacheManager.set(email, otp, { ttl: 900 });
    console.log(await this.cacheManager.get(email))
    return otp;
  }
}
