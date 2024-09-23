import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import CreateUserDto from '../user/create-user.dto';
import ApiResponse from '../classes/api-response';
import EmailOtpDto from '../dto/email-otp.dto';

@Controller({
  path: '/auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/is_authenticated')
  public async isAuthenticated(@Headers() headers: any) {
    return ApiResponse.success(
      await this.authService.isAuthenticated(headers),
      'Login Successful',
    );
  }

  @Post('/verify_email')
  public async verifyEmail(@Body() createUserDto: CreateUserDto) {
    return ApiResponse.success(
      await this.authService.verifyEmail(createUserDto),
      'Registration Successful',
    );
  }

  @Post('/send_otp_email')
  public async sendOtpEmail(@Body() emailOtpDto: EmailOtpDto) {
    return ApiResponse.success(
      await this.authService.sendOtpEmail(emailOtpDto.email),
      'Passcode Sent',
    );
  }
}
