import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import type { RequestWithUser } from './interfaces/jwt-payload.interface';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    const result = this.authservice.register(registerDto);

    return result;
  }

  @Post('login')
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authservice.login(loginDto, res);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Request() req: RequestWithUser) {
    return req.user;
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logged out' };
  }

  @Get('verify')
  @UseGuards(AuthGuard)
  verify(@Request() req: RequestWithUser) {
    return req.user;
  }
}
