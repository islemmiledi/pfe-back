import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
  UseGuards,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from '../user/decorator/user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {} // Correction ici

  @UseGuards(JwtGuard)
  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createHomeDto: CreateHomeDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
  ) {
    return await this.homeService.create(createHomeDto, file, user); // Correction ici
  }

  @UseGuards(JwtGuard)
  @Get('home-user')
  async getHomesByUser(@GetUser() user: User) {
    return await this.homeService.getHomesByUser(user);
  }

  @Get('/homes')
  async findAll() {
    return await this.homeService.findAll(); // Correction ici
  }

  @Get(':id') // Utilisez le paramètre 'id' dans l'URL
  async findOne(@Param('id') id: string) {
    return await this.homeService.findOne(id);
  }

  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updateHomeDto: UpdateHomeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.homeService.update(id, file, updateHomeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.homeService.remove(id);
  }
}
