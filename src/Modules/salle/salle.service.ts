import { Injectable } from '@nestjs/common';
import { CreateSalleDto } from './dto/create-salle.dto';
import { UpdateSalleDto } from './dto/update-salle.dto';
import { Salle } from './entities/salle.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class SalleService {
  constructor(
    @InjectRepository(Salle) private readonly _salleRepo: Repository<Salle>,
    private cloudinary: CloudinaryService,
  ) {}

  async create(createSalleDto: CreateSalleDto, file: Express.Multer.File) {
    const image = await this.cloudinary.uploadImage(file);
    const salleToCreate = await this._salleRepo.save({
      ...createSalleDto,
      file: image.secure_url, // Assurez-vous que 'file' est le bon nom de champ attendu par votre entité
    });

    return salleToCreate;
  }

  async findAll(): Promise<Salle[]> {
    return await this._salleRepo.find();
  }

  async findOne(id: string): Promise<Salle> {
    return await this._salleRepo.findOne({
      where: { id: id },
      relations: [
        'program',
        'coachs',
        'offres',
        'aboutuss',
        'footers',
        'homes',
      ],
    });
  }

  // async findOneByWebsite(website: string): Promise<Salle> {
  //   try {
  //     const salle = await this._salleRepo.findOne({
  //       where: { websites: website },
  //       relations: ['program', 'coachs', 'offres', 'footers', 'aboutuss'],
  //     });
  //     if (!salle) {
  //       console.log('No salle found for website:', website);
  //       return null; // Or handle as you see fit
  //     }
  //     return salle;
  //   } catch (error) {
  //     console.error('Failed to fetch salle:', error);
  //     throw new Error('Database query failed');
  //   }
  // }

  async update(id: string, updateSalleDto: UpdateSalleDto) {
    return await this._salleRepo.update(id, updateSalleDto);
  }

  async remove(id: string) {
    return await this._salleRepo.delete(id);
  }
}
