import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AboutusService } from './aboutus.service';
import { CreateAboutusDto } from './dto/create-aboutus.dto';
import { UpdateAboutusDto } from './dto/update-aboutus.dto';

@Controller('aboutus')
export class AboutusController {
  constructor(private readonly aboutusService: AboutusService) {} // Correction ici

  @Post('/create')
  async create(@Body() createAboutusDto: CreateAboutusDto) {
    return await this.aboutusService.create(createAboutusDto); // Correction ici
  }

  @Get()
  findAll() {
    return this.aboutusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aboutusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAboutusDto: UpdateAboutusDto) {
    return this.aboutusService.update(+id, updateAboutusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aboutusService.remove(+id);
  }
}
