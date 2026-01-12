import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  private readonly saltRounds = 12;

  async register({ email, name, password }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) throw new BadRequestException('User already exists');

    const userSaved = await this.usersService.create({
      email,
      name,
      password: await bcrypt.hash(password, this.saltRounds),
    });

    return userSaved;
  }
  login(): string {
    return 'Hello login!';
  }
}
