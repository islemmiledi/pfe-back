import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OffreService } from './offre.service';
import { CreateOffreDto } from './dto/create-offre.dto';
import { UpdateOffreDto } from './dto/update-offre.dto';
import { GetUser } from '../user/decorator/user.decorator';
import { User } from '../user/entities/user.entity';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('offre')
export class OffreController {
  constructor(private readonly offreService: OffreService) {}

  @UseGuards(JwtGuard)
  @Post('/create')
  async create(@Body() createOffreDto: CreateOffreDto, @GetUser() user: User) {
    return await this.offreService.create(createOffreDto, user);
  }

  @Get('/offres')
  findAll() {
    return this.offreService.findAll(); // Correction ici
  }

  @UseGuards(JwtGuard)
  @Get('offre-user')
  async getOffresByUser(@GetUser() user: User) {
    return await this.offreService.getOffresByUser(user);
  }

  @Get(':id') // Utilisez le paramètre 'id' dans l'URL
  findOne(@Param('id') id: string) {
    return this.offreService.findOne(id); // Convertissez 'id' en nombre si votre ID est numérique
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOffreDto: UpdateOffreDto,
  ) {
    return await this.offreService.update(id, updateOffreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offreService.remove(id);
  }
}
