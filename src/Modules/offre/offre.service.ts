import { Injectable } from '@nestjs/common';
import { CreateOffreDto } from './dto/create-offre.dto';
import { UpdateOffreDto } from './dto/update-offre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offre } from './entities/offre.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class OffreService {
  constructor(
    @InjectRepository(Offre)
    private readonly _offreRepo: Repository<Offre>,
  ) {}

  async create(createOffreDto: CreateOffreDto, user: User) {
    return await this._offreRepo.save({ ...createOffreDto, user });
  }
  async findAll(): Promise<Offre[]> {
    return await this._offreRepo.find();
  }

  async findOne(id: string): Promise<Offre> {
    return await this._offreRepo.findOneBy({ id: id });
  }

  async getOffresByUser(user: User) {
    return await this._offreRepo.find({
      where: { userId: user.id },
      order: { createdAt: 'ASC' },
    });
  }

  async update(id: string, updateOffreDto: UpdateOffreDto) {
    return await this._offreRepo.update(id, updateOffreDto);
  }

  async remove(id: string) {
    return await this._offreRepo.delete(id);
  }
}
