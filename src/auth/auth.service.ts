import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { RegisterUserDto } from './dto/register-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { PrismaClient } from '@prisma/client'
import { RpcException } from '@nestjs/microservices'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import { envs } from 'src/config/envs'

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    private readonly jwtService: JwtService
  ) {
    super()
  }

  onModuleInit() {
    this.$connect()
    this.logger.log('Connected to the MongoDB database')
  }

  async signJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload)
  }


  async verifyToken(token: string) {
    try {
      const { sub: _, iat: __, exp: ___, ...user } = this.jwtService.verify(token, {
        secret: envs.jwtSecret
      })

      return {
        user,
        token: await this.signJwtToken(user)
      }
    } catch {
      throw new RpcException({
        status: 401,
        message: 'Invalid token'
      })
    }
  }

  async registerUser(registerUserDto: RegisterUserDto) {

    const { email, name, password } = registerUserDto

    const existingUser = await this.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      throw new RpcException({
        status: 400,
        message: 'User already exists'
      })
    }


    try {
      const user = await this.user.create({
        data: {
          email,
          name,
          password: bcrypt.hashSync(password, 10)
        }
      })

      const { password: _, ...rest } = user

      return {
        user: rest,
        token: await this.signJwtToken(rest)
      }

    } catch (error) {
      throw new RpcException({
        status: 500,
        message: error.message
      })
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto

    try {
      const user = await this.user.findUnique({
        where: { email }
      })

      if (!user) {
        throw new RpcException({
          status: 400,
          message: 'User not found'
        })
      }


      const isPasswordValid = bcrypt.compareSync(password, user.password)

      if (!isPasswordValid) {
        throw new RpcException({
          status: 400,
          message: 'Invalid password'
        })
      }

      const { password: _, ...rest } = user

      return {
        user: rest,
        token: await this.signJwtToken(rest)
      }

    } catch (error) {
      throw new RpcException({
        status: 500,
        message: error.message
      })
    }
  }

}
