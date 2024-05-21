import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aboutus } from './entities/about-us.entity';
import { CreateAboutusDto } from './dto/create-about-us.dto';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AboutusService {
  constructor(
    @InjectRepository(Aboutus)
    private readonly _aboutusRepo: Repository<Aboutus>,
    private cloudinary: CloudinaryService,
  ) {}

  async create(
    createAboutusDto: CreateAboutusDto,
    file: Express.Multer.File,
    user: User,
  ) {
    const image = await this.cloudinary.uploadImage(file);
    const newAboutus = await this._aboutusRepo.save({
      ...createAboutusDto,

      file: image.secure_url,
      user,
    });

    // return await this._aboutusRepo.save(createAboutusDto);
    return newAboutus;
  }

  async findAll(): Promise<Aboutus[]> {
    return await this._aboutusRepo.find();
  }

  // async getAboutUssBySalleId(salleId: string) {
  //   return await this._aboutusRepo
  //     .createQueryBuilder('aboutus')
  //     .where('aboutus.salleId = :salleId', { salleId: salleId })
  //     .getMany();
  // }
  async getAboutUssByUser(user: User) {
    return await this._aboutusRepo.find({
      where: { userId: user.id },
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Aboutus> {
    return await this._aboutusRepo.findOneBy({ id: id });
  }

  async update(id: string, updateAboutUsDto: UpdateAboutUsDto) {
    return await this._aboutusRepo.update(id, updateAboutUsDto);
  }

  async remove(id: string) {
    return await this._aboutusRepo.delete(id);
  }
}
