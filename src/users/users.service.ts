import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const now = new Date();

    const userEmailAlreadyinUse = this.users.find(
      (storedUser) => createUserDto.email === storedUser.email,
    );

    if (userEmailAlreadyinUse) {
      throw new BadRequestException('email is already used');
    }

    const user: User = {
      ...createUserDto,
      id: this.users.length + 1,
      lastLogin: now,
      createdAt: now,
      updatedAt: now,
    };

    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const userFound = this.users.find((user) => user.id === id);

    if (!userFound) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return userFound;
  }

  update(id: number, dto: UpdateUserDto): User {
    const userFound = this.findOne(id);

    Object.assign(userFound, dto, {
      updatedAt: new Date(),
    });

    return userFound;
  }

  remove(id: number) {
    const userFound = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== userFound.id);
    return `user with id ${id} has been deleted`;
  }
}
