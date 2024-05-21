import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { SalleService } from './salle.service';
import { CreateSalleDto } from './dto/create-salle.dto';
import { UpdateSalleDto } from './dto/update-salle.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('salle')
@UseInterceptors(FileInterceptor('file'))
export class SalleController {
  constructor(private readonly salleService: SalleService) {}

  @Post('/create')
  async create(
    @Body() createSalleDto: CreateSalleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.salleService.create(createSalleDto, file);
  }

  @Get('/salles')
  findAll() {
    return this.salleService.findAll(); // Correction ici
  }

  @Get(':id') // Utilisez le paramètre 'id' dans l'URL
  findOne(@Param('id') id: string) {
    return this.salleService.findOne(id); // Convertissez 'id' en nombre si votre ID est numérique
  }

  // @Post(':website') // Utilisez le paramètre 'id' dans l'URL
  // async findOneByWebsite(@Param('website') website: string) {
  //   return await this.salleService.findOneByWebsite(website); // Convertissez 'id' en nombre si votre ID est numérique
  // }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSalleDto: UpdateSalleDto,
  ) {
    return await this.salleService.update(id, updateSalleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salleService.remove(id);
  }
}
