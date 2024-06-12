import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { Coach } from './entities/coach.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CoachService {
  constructor(
    @InjectRepository(Coach) private readonly _coachRepo: Repository<Coach>,
    private cloudinary: CloudinaryService,
  ) {}

  async create(
    createCoachDto: CreateCoachDto,
    file: Express.Multer.File,
    user: User,
  ) {
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
        user,
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

  async findAll(user: User): Promise<Coach[]> {
    return await this._coachRepo.find({
      where: { userId: user.id },
      order: { Nom: 'ASC' },
    });
  }

  async getCoachsByUser(user: User) {
    return await this._coachRepo.find({
      where: { userId: user.id },
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Coach> {
    return await this._coachRepo.findOneBy({ id: id });
  }

  async update(
    id: string,
    file: Express.Multer.File,
    updateCoachDto: UpdateCoachDto,
  ) {
    const image = await this.cloudinary.uploadImage(file);

    return await this._coachRepo.update(id, {
      ...updateCoachDto,
      file: image.secure_url,
    });
  }

  async remove(id: string) {
    return await this._coachRepo.delete(id);
  }
}
