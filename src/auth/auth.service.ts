import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
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

  async login({ email, password }: LoginDto) {
    const userFound = await this.usersService.findOneByEmail(email);

    if (!userFound) throw new NotFoundException(`User does not exist`);

    const isPasswordMatched = await bcrypt.compare(
      password,
      userFound.password,
    );

    if (!isPasswordMatched)
      throw new UnauthorizedException('Password incorrect');

    return userFound;
  }
}
