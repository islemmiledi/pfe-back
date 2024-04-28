import { Injectable } from '@nestjs/common';
import { CreateOrdreDto } from './dto/create-ordre.dto';
import { UpdateOrdreDto } from './dto/update-ordre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ordre } from './entities/ordre.entity';

@Injectable()
export class OrdreService {
  constructor(
    @InjectRepository(Ordre)
    private readonly _ordreRepo: Repository<Ordre>,
  ) {}

  async create(createOrdreDto: CreateOrdreDto) {
    return await this._ordreRepo.save(createOrdreDto);
  }

  async findAll(): Promise<Ordre[]> {
    return await this._ordreRepo.find();
  }

  async findOne(id: string): Promise<Ordre> {
    return await this._ordreRepo.findOneBy({ id: id });
  }

  async update(id: string, updateOrdreDto: UpdateOrdreDto) {
    return await this._ordreRepo.update(id, updateOrdreDto);
  }

  async remove(id: string) {
    return await this._ordreRepo.delete(id);
  }
}
