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
  Query,
  UseGuards,
} from '@nestjs/common';
import { AboutusService } from './about-us.service';
import { CreateAboutusDto } from './dto/create-about-us.dto';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from '../user/decorator/user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('aboutus')
export class AboutusController {
  constructor(private readonly aboutusService: AboutusService) {} // Correction ici

  @UseGuards(JwtGuard)
  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createAboutusDto: CreateAboutusDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
  ) {
    return await this.aboutusService.create(createAboutusDto, file, user); // Correction ici
  }

  @Get('/about-us')
  findAll() {
    return this.aboutusService.findAll(); // Correction ici
  }

  // @Get('aboutus-salle')
  // async getAboutUssBySalleId(@Query('salleId') salleId: string) {
  //   return await this.aboutusService.getAboutUssBySalleId(salleId);
  // }

  @UseGuards(JwtGuard)
  @Get('aboutus-user')
  async getAboutUssByUser(@GetUser() user: User) {
    return await this.aboutusService.getAboutUssByUser(user);
  }
  @Get(':id') // Utilisez le paramètre 'id' dans l'URL
  findOne(@Param('id') id: string) {
    return this.aboutusService.findOne(id); // Convertissez 'id' en nombre si votre ID est numérique
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAboutUsDto: UpdateAboutUsDto,
  ) {
    return await this.aboutusService.update(id, updateAboutUsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aboutusService.remove(id);
  }
}
