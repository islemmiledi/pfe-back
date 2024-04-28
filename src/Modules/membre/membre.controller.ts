import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MembreService } from './membre.service';
import { CreateMembreDto } from './dto/create-membre.dto';
import { UpdateMembreDto } from './dto/update-membre.dto';
import { Membre } from './entities/membre.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('membre')
export class MembreController {
  constructor(private readonly membreService: MembreService) {}

  @Post('/create')
  async create(
    @Body() createMembreDto: CreateMembreDto,
    @Body() createUserDto: CreateUserDto,
  ) {
    return await this.membreService.create(createMembreDto, createUserDto);
  }

  @Get('/members') // Si vous voulez garder '/members' comme chemin, assurez-vous qu'il correspond à la structure de votre API
  async findAll() {
    return await this.membreService.findAll();
  }

  @Get(':id') // Utilisez le paramètre 'id' dans l'URL
  findOne(@Param('id') id: string) {
    return this.membreService.findOne(id); // Convertissez 'id' en nombre si votre ID est numérique
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMembreDto: UpdateMembreDto) {
    return this.membreService.update(id, updateMembreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membreService.remove(id);
  }
}
