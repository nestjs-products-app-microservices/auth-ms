import { IsString, IsNotEmpty, IsEmail } from 'class-validator'

export class RegisterUserDto {
  @IsString()
  name: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}