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
import { PaginationDto } from 'src/common/pagination.dto';

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

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;

    const skip = (page - 1) * limit;

    const [users, total] = await this._userRepository.findAndCount({
      skip,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      users,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
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
