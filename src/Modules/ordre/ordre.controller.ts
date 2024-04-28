import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdreService } from './ordre.service';
import { CreateOrdreDto } from './dto/create-ordre.dto';
import { UpdateOrdreDto } from './dto/update-ordre.dto';

@Controller('ordre')
export class OrdreController {
  constructor(private readonly ordreService: OrdreService) {}

  @Post('/create')
  async create(@Body() createOrdreDto: CreateOrdreDto) {
    return await this.ordreService.create(createOrdreDto);
  }

  @Get('/ordres') // Si vous voulez garder '/members' comme chemin, assurez-vous qu'il correspond à la structure de votre API
  findAll() {
    return this.ordreService.findAll();
  }

  @Get(':id') // Utilisez le paramètre 'id' dans l'URL
  findOne(@Param('id') id: string) {
    return this.ordreService.findOne(id); // Convertissez 'id' en nombre si votre ID est numérique
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdreDto: UpdateOrdreDto) {
    return this.ordreService.update(id, updateOrdreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordreService.remove(id);
  }
}
