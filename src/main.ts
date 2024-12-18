import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { envs } from './config/envs'

async function bootstrap() {
  const logger = new Logger('Auth MS')

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: envs.natsServers
    }
  })

  await app.listen()
  logger.log(`Auth microservice running on port:${envs.port}`)
}
bootstrap()
