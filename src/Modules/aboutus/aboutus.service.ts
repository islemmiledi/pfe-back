import { Injectable } from '@nestjs/common';
import { CreateAboutusDto } from './dto/create-aboutus.dto';
import { UpdateAboutusDto } from './dto/update-aboutus.dto';
import { Aboutus } from './entities/aboutus.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AboutusService {
  constructor(
    @InjectRepository(Aboutus)
    private readonly _aboutusRepo: Repository<Aboutus>,
  ) {}

  async create(createAboutusDto: CreateAboutusDto) {
    return await this._aboutusRepo.save(createAboutusDto);
  }

  findAll() {
    return `This action returns all aboutus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aboutus`;
  }

  update(id: number, updateAboutusDto: UpdateAboutusDto) {
    return `This action updates a #${id} aboutus`;
  }

  remove(id: number) {
    return `This action removes a #${id} aboutus`;
  }
}
