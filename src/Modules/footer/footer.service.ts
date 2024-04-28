import { Injectable } from '@nestjs/common';
import { CreateFooterDto } from './dto/create-footer.dto';
import { UpdateFooterDto } from './dto/update-footer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Footer } from './entities/footer.entity';

@Injectable()
export class FooterService {
  constructor(
    @InjectRepository(Footer) private readonly _footerRepo: Repository<Footer>,
  ) {}

  async create(createFooterDto: CreateFooterDto) {
    return await this._footerRepo.save(createFooterDto);
  }

  async findAll(): Promise<Footer[]> {
    return await this._footerRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} footer`;
  }

  async update(id: string, updateFooterDto: UpdateFooterDto) {
    return await this._footerRepo.update(id, updateFooterDto);
  }
  remove(id: number) {
    return `This action removes a #${id} footer`;
  }
}
