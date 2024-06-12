import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { GetUser } from '../user/decorator/user.decorator';
import { User } from '../user/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProduitService } from './produit.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('produit')
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}

  @UseGuards(JwtGuard)
  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createProduitDto: CreateProduitDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
  ) {
    return await this.produitService.create(createProduitDto, file, user); // Correction ici
  }

  @Get('/produits') // Si vous voulez garder '/members' comme chemin, assurez-vous qu'il correspond à la structure de votre API
  findAll() {
    return this.produitService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('produit-user')
  async getProduitsByUser(@GetUser() user: User) {
    return await this.produitService.getProduitsByUser(user);
  }

  @Get(':id') // Utilisez le paramètre 'id' dans l'URL
  findOne(@Param('id') id: string) {
    return this.produitService.findOne(id); // Convertissez 'id' en nombre si votre ID est numérique
  }

  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updateProduitDto: UpdateProduitDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.produitService.update(id, file, updateProduitDto); // Correction ici
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produitService.remove(id);
  }
}
