import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);

    return {
      ok: true,
      method: 'POST',
      data: newUser,
    };
  }

  @Get()
  async findAll(@Query() query: PaginationDto) {
    const data = await this.usersService.findAll(query);

    return {
      ok: true,
      method: 'GET',
      data,
    };
  }

  @Get('/summary-analytics')
  async getSummary() {
    const data = await this.usersService.getUsersSummary();

    return {
      ok: true,
      method: 'GET',
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.usersService.findOne(id);

    return {
      ok: true,
      method: 'GET',
      data,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.usersService.update(id, updateUserDto);

    return {
      ok: true,
      method: 'PATCH',
      data,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
