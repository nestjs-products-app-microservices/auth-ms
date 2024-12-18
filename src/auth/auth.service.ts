import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { RegisterUserDto } from './dto/register-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name)

  onModuleInit() {
    this.$connect()
    this.logger.log('Connected to the MongoDB database')
  }

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
