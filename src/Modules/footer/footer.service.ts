import { Injectable } from '@nestjs/common';
import { CreateFooterDto } from './dto/create-footer.dto';
import { UpdateFooterDto } from './dto/update-footer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Footer } from './entities/footer.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class FooterService {
  constructor(
    @InjectRepository(Footer) private readonly _footerRepo: Repository<Footer>,
  ) {}

  async create(createFooterDto: CreateFooterDto, user: User) {
    return await this._footerRepo.save({ ...createFooterDto, user });
  }

  async getFootersByUser(user: User) {
    return await this._footerRepo.find({
      where: { userId: user.id },
      order: { createdAt: 'ASC' },
    });
  }

  async findAll(): Promise<Footer[]> {
    return await this._footerRepo.find();
  }

  async getFootersBySalleId(salleId: string) {
    return await this._footerRepo
      .createQueryBuilder('footer')
      .where('footer.salleId = :salleId', { salleId: salleId })
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} footer`;
  }

  async update(id: string, updateFooterDto: UpdateFooterDto) {
    return await this._footerRepo.update(id, updateFooterDto);
  }
  async remove(id: string) {
    return await this._footerRepo.delete(id);
  }
}
