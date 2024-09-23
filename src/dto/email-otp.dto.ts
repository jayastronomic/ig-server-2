import { IsEmail, IsNotEmpty } from "class-validator";

export default class EmailOtpDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string
}