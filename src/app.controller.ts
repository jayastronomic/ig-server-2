import { Controller, Get, Inject, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailService } from './email/email.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Controller('/' 
  
)

export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @Get(':email')
  async getPasscode(@Param('email') email: string) {
    return await this.cacheManager.get(email);
  }
}
