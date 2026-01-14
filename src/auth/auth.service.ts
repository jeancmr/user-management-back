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
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  private readonly saltRounds = 12;

  async register({
    email,
    name,
    password,
    company,
    plan,
    role,
    status,
  }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) throw new BadRequestException('User already exists');

    const userSaved = await this.usersService.create({
      email,
      company,
      name,
      password: await bcrypt.hash(password, this.saltRounds),
      plan,
      role,
      status,
    });

    const { password: userPassword, ...newUser } = userSaved;
    console.log(userPassword);

    return { message: 'User signed up sucessfully', data: newUser };
  }

  async login({ email, password }: LoginDto, res: Response) {
    const userFound = await this.usersService.findOneByEmail(email);

    if (!userFound) throw new NotFoundException(`User does not exist`);

    const isPasswordMatched = await bcrypt.compare(
      password,
      userFound.password,
    );

    if (!isPasswordMatched)
      throw new UnauthorizedException('Password incorrect');

    const payload = { email };

    const token = await this.jwtService.signAsync(payload);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    const { password: userPassword, ...user } = userFound;
    console.log(userPassword);

    return { message: 'User logged sucessfully', data: user };
  }
}
