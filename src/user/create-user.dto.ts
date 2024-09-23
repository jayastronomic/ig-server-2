import { IsEmail, IsNotEmpty } from 'class-validator';

export default class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly fullName: string;

  @IsNotEmpty()
  readonly birthDate: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly passcode: string;
}
