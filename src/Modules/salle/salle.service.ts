import { Injectable } from '@nestjs/common';
import { CreateSalleDto } from './dto/create-salle.dto';
import { UpdateSalleDto } from './dto/update-salle.dto';
import { Salle } from './entities/salle.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SalleService {
  constructor(
    @InjectRepository(Salle)
    private readonly _salleRepo: Repository<Salle>,
  ) {}

  async create(createSalleDto: CreateSalleDto) {
    return await this._salleRepo.save(createSalleDto);
  }

  async findAll(): Promise<Salle[]> {
    return await this._salleRepo.find();
  }

  async findOne(id: string): Promise<Salle> {
    return await this._salleRepo.findOneBy({ id: id });
  }

  async update(id: string, updateSalleDto: UpdateSalleDto) {
    return await this._salleRepo.update(id, updateSalleDto);
  }

  async remove(id: string) {
    return await this._salleRepo.delete(id);
  }
}
