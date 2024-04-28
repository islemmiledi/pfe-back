import {
  Controller,
  Post,
  Request,
  UseGuards,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/Modules/user/dto/create-user.dto';
import { UserService } from 'src/Modules/user/user.service';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('file'))
  async registerUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.userService.create(createUserDto, file);
  }
  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refrshToken(@Request() req) {
    return await this.authService.refreshToken(req.user);
  }
}
