import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {

  registerUser() {
    return 'Registering user...'
  }

  loginUser() {
    return 'Logging in user...'
  }

  verifyUser() {
    return 'Verifying user...'
  }
}
