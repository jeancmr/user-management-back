import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this._userRepository.create(createUserDto);
      const savedUser = await this._userRepository.save(user);

      return savedUser;
    } catch (error) {
      console.error('Error in UsersService = ', error);
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    const [users, total] = await this._userRepository.findAndCount();

    return {
      users,
      total,
    };
  }

  async findOne(id: number) {
    const userFound = await this._userRepository.findOneBy({ id });

    if (!userFound) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return userFound;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userFound = await this.findOne(id);

    await this._userRepository.update({ id: userFound.id }, updateUserDto);

    return { message: `User with id ${id} updated succesfully` };
  }

  async remove(id: number) {
    const userFound = await this.findOne(id);

    await this._userRepository.remove(userFound);

    return { message: 'User deleted successfully' };
  }
}
