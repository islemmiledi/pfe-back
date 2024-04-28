import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { Coach } from './entities/coach.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class CoachService {
  constructor(
    @InjectRepository(Coach) private readonly _coachRepo: Repository<Coach>,
    private cloudinary: CloudinaryService,
  ) {}

  async create(createCoachDto: CreateCoachDto, file: Express.Multer.File) {
    try {
      const existingUser = await this._coachRepo.findOne({
        where: { Nom: createCoachDto.Nom },
      });

      if (existingUser) {
        throw new ConflictException('Nom already exists');
      }

      const image = await this.cloudinary.uploadImage(file);

      const newCoach = await this._coachRepo.save({
        ...createCoachDto,
        file: image.secure_url,
      });

      return newCoach; // Ensure this is being returned
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('This gym must appear for one gerant');
      }
      throw error; // Make sure to rethrow the error if not handled
    }
  }

  async findAll(): Promise<Coach[]> {
    return await this._coachRepo.find();
  }

  async findOne(id: string): Promise<Coach> {
    return await this._coachRepo.findOneBy({ id: id });
  }

  async update(id: string, updateCoachDto: UpdateCoachDto) {
    return await this._coachRepo.update(id, updateCoachDto);
  }

  async remove(id: string) {
    return await this._coachRepo.delete(id);
  }
}
