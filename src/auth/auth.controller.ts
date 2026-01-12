import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    const result = this.authservice.register(registerDto);

    return result;
  }

  @Post('login')
  login() {
    return this.authservice.login();
  }
}
