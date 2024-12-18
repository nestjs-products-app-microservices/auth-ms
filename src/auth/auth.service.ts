import { Injectable } from '@nestjs/common'
import { RegisterUserDto } from './dto/register-user.dto'
import { LoginUserDto } from './dto/login-user.dto'

@Injectable()
export class AuthService {

  registerUser(registerUserDto: RegisterUserDto) {
    return {
      message: 'User registered successfully',
      data: registerUserDto
    }
  }

  loginUser(loginUserDto: LoginUserDto) {
    return {
      message: 'User logged in successfully',
      data: loginUserDto
    }
  }

  verifyUser() {
    return {
      message: 'User verified successfully'
    }
  }
}
