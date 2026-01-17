import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PaginationDto } from 'src/common/pagination.dto';
import { UserPlan, UserStatus } from './enums';
import { getUserGrowthData } from './utils/get-user-growth-data';
import { getPlanDistributionData } from './utils/get-plan-distribution-data';
import { getWeeklyActivityData } from './utils/get-weekly-activity-data';

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
    const { limit = 10, page = 1, status, role, plan, search } = paginationDto;

    const skip = (page - 1) * limit;

    const where: FindOptionsWhere<User>[] = [];

    const baseFilters: FindOptionsWhere<User> = {};

    if (status) baseFilters.status = status;

    if (role) baseFilters.role = role;

    if (plan) baseFilters.plan = plan;

    if (search) {
      where.push(
        { ...baseFilters, name: ILike(`%${search}%`) },
        { ...baseFilters, email: ILike(`%${search}%`) },
      );
    } else {
      where.push(baseFilters);
    }

    const [users, total] = await this._userRepository.findAndCount({
      where,
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

  async findOneByEmail(email: string) {
    return await this._userRepository.findOneBy({ email });
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

  async getUsersSummary() {
    const users = await this._userRepository.find();
    return {
      summary: {
        totalUsers: users.length,
        active: users.filter((user) => user.status === UserStatus.ACTIVE)
          .length,
        suspended: users.filter((user) => user.status === UserStatus.SUSPENDED)
          .length,
        pro: users.filter((user) => user.plan === UserPlan.PRO).length,
      },
      analytics: {
        userGrowth: getUserGrowthData(users),
        planDistribution: getPlanDistributionData(users),
        weeklyActivity: getWeeklyActivityData(users),
      },
    };
  }
}
