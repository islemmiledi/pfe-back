import { Injectable } from '@nestjs/common';
import { CreateSalleDto } from './dto/create-salle.dto';
import { UpdateSalleDto } from './dto/update-salle.dto';
import { Salle } from './entities/salle.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { TypeTheme } from './enum/type.enum';

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
        'produits',
      ],
    });
  }

  async update(id: string, updateSalleDto: UpdateSalleDto) {
    return await this._salleRepo.update(id, updateSalleDto);
  }

  async remove(id: string) {
    return await this._salleRepo.delete(id);
  }

  async findSallesByTheme(theme: string): Promise<Salle[]> {
    switch (theme) {
      case 'silver':
        return await this._salleRepo.find({
          where: { Typetheme: TypeTheme.SILVER },
        });
      case 'premium':
        return await this._salleRepo.find({
          where: { Typetheme: TypeTheme.PREMIUM },
        });
      case 'gold':
        return await this._salleRepo.find({
          where: { Typetheme: TypeTheme.GOLD },
        });
    }
  }
}
