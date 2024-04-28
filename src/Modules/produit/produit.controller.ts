import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';

@Controller('produit')
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}

  @Post('/create')
  async create(@Body() createProduitDto: CreateProduitDto) {
    return await this.produitService.create(createProduitDto);
  }

  @Get('/produits') // Si vous voulez garder '/members' comme chemin, assurez-vous qu'il correspond à la structure de votre API
  findAll() {
    return this.produitService.findAll();
  }

  @Get(':id') // Utilisez le paramètre 'id' dans l'URL
  findOne(@Param('id') id: string) {
    return this.produitService.findOne(id); // Convertissez 'id' en nombre si votre ID est numérique
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProduitDto: UpdateProduitDto) {
    return this.produitService.update(id, updateProduitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produitService.remove(id);
  }
}
