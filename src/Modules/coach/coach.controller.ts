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
} from '@nestjs/common';

import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto'; // Correction ici
import { CoachService } from './coach.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles, RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRoles } from '../user/enum/user.enum';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('coach')
export class CoachController {
  constructor(private readonly coachService: CoachService) {} // Correction ici

  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createCoachDto: CreateCoachDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.coachService.create(createCoachDto, file); // Correction ici
  }
  @SetMetadata(UserRoles, [UserRoles.GERANT])
  @UseGuards(JwtGuard, RolesGuard)
  @Get('/coachs')
  async findAll() {
    return await this.coachService.findAll(); // Correction ici
  }

  @Get(':id') // Utilisez le paramètre 'id' dans l'URL
  findOne(@Param('id') id: string) {
    return this.coachService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCoachDto: UpdateCoachDto,
  ) {
    return await this.coachService.update(id, updateCoachDto); // Correction ici
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coachService.remove(id); // Correction ici
  }
}
