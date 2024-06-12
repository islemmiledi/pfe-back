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
  SetMetadata,
  Query,
} from '@nestjs/common';

import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto'; // Correction ici
import { CoachService } from './coach.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles, RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRoles } from '../user/enum/user.enum';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from '../user/decorator/user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('coach')
export class CoachController {
  constructor(private readonly coachService: CoachService) {} // Correction ici

  @UseGuards(JwtGuard)
  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createCoachDto: CreateCoachDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
  ) {
    return await this.coachService.create(createCoachDto, file, user); // Correction ici
  }
  // @Roles(UserRoles.GERANT)
  @UseGuards(JwtGuard)
  @Get('/coachs')
  async findAll(@GetUser() user: User) {
    return await this.coachService.findAll(user); // Correction ici
  }

  @UseGuards(JwtGuard)
  @Get('coach-user')
  async getCoachsByUser(@GetUser() user: User) {
    return await this.coachService.getCoachsByUser(user);
  }

  @Get(':id') // Utilisez le paramètre 'id' dans l'URL
  findOne(@Param('id') id: string) {
    return this.coachService.findOne(id);
  }

  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updateCoachDto: UpdateCoachDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.coachService.update(id, file, updateCoachDto); // Correction ici
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coachService.remove(id); // Correction ici
  }
}
