import { Injectable } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Repository } from 'typeorm';
import { Produit } from './entities/produit.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(Produit)
    private readonly _produitRepo: Repository<Produit>,
  ) {}

  async create(createProduitDto: CreateProduitDto) {
    return await this._produitRepo.save(createProduitDto);
  }

  async findAll(): Promise<Produit[]> {
    return await this._produitRepo.find();
  }

  async findOne(id: string): Promise<Produit> {
    return await this._produitRepo.findOneBy({ id: id });
  }

  async update(id: string, updateProduitDto: UpdateProduitDto) {
    return await this._produitRepo.update(id, updateProduitDto);
  }

  async remove(id: string) {
    return await this._produitRepo.delete(id);
  }
}
