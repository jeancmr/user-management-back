import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(registerDto: RegisterDto) {
    const result = await this.usersService.create(registerDto);
    console.log({ result });
    return 'Hell register!';
  }
  login(): string {
    return 'Hello login!';
  }
}
