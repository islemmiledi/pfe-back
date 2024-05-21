import { Injectable } from '@nestjs/common';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Home } from './entities/home.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home)
    private readonly _homeRepo: Repository<Home>,
    private cloudinary: CloudinaryService,
  ) {}

  async create(
    createHomeDto: CreateHomeDto,
    file: Express.Multer.File,
    user: User,
  ) {
    const image = await this.cloudinary.uploadImage(file);

    const newHome = await this._homeRepo.save({
      ...createHomeDto,

      file: image.secure_url,
      user,
    });

    // return await this._aboutusRepo.save(createAboutusDto);
    return newHome;
  }

  async getHomesByUser(user: User) {
    return await this._homeRepo.find({
      where: { userId: user.id },
      order: { createdAt: 'ASC' },
    });
  }

  async findAll(): Promise<Home[]> {
    return await this._homeRepo.find();
  }

  async findOne(id: string): Promise<Home> {
    return await this._homeRepo.findOneBy({ id: id });
  }
  async update(
    id: string,
    file: Express.Multer.File,
    updateHomeDto: UpdateHomeDto,
  ) {
    const image = await this.cloudinary.uploadImage(file);

    return await this._homeRepo.update(id, {
      ...updateHomeDto,
      file: image.secure_url,
    });
  }

  async remove(id: string) {
    return await this._homeRepo.delete(id);
  }
}
