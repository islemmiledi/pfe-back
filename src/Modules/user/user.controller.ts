import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsEmail } from 'class-validator';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles, RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRoles } from './enum/user.enum';
import { GetUser } from './decorator/user.decorator';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post('/register')
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @Post('/getoneuser')
  findOneWithUserName(@Body() email: string) {
    return this.userService.findOneWithUserName(email);
  }

  // @Roles(UserRoles.ADMIN, UserRoles.GERANT)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('/users')
  async findAll(@Body() salle: string) {
    return await this.userService.findAll(salle);
  }
  // @SetMetadata(UserRoles, [UserRoles.GERANT])
  @UseGuards(JwtGuard)
  @Get('/users/pagination')
  async findAllWithPagination(
    @Query('page') page: number,
    @GetUser() user: User,
  ) {
    return await this.userService.findAllWithPagination(page, user);
  }
  @UseGuards(JwtGuard)
  @Get('/oneuser')
  async findOneWithId(@GetUser() user: User) {
    return await this.userService.findOneWithId(user);
  }

  // @SetMetadata(UserRoles, [UserRoles.ADMIN])
  // @UseGuards(JwtGuard, RolesGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }

  @UseGuards(JwtGuard)
  @Get('/current')
  async getCurrentUser(@GetUser() user: User) {
    return user;
  }
}
