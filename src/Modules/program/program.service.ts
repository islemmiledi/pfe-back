import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { Program } from './entities/program.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    private readonly _programRepo: Repository<Program>,
    private cloudinary: CloudinaryService,
  ) {}
  async create(
    createProgramDto: CreateProgramDto,
    file: Express.Multer.File,
    user: User,
  ) {
    const image = await this.cloudinary.uploadImage(file);

    try {
      const existingProgram = await this._programRepo.findOne({
        where: { title: createProgramDto.title },
      });

      if (existingProgram) {
        throw new ConflictException('Nom already exists');
      }

      // const image = await this.cloudinary.uploadImage(file);

      const newProgram = await this._programRepo.save({
        ...createProgramDto,
        file: image.secure_url,
        user,

        // file: image.secure_url,
      });

      return newProgram; // Ensure this is being returned
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('This gym must appear for one gerant');
      }
      throw error; // Make sure to rethrow the error if not handled
    }
  }

  findAll() {
    return `This action returns all program`;
  }

  findOne(id: number) {
    return `This action returns a #${id} program`;
  }
  async getProgramsByUser(user: User) {
    return await this._programRepo.find({where:{userId:user.id},order:{createdAt:'ASC'}});
      
  }

  async update(
    id: string,
    updateProgramDto: UpdateProgramDto,
    file?: Express.Multer.File,
  ) {
    try {
      const programToUpdate = await this._programRepo.findOne({
        where: { id: id },
      });

      if (!programToUpdate) {
        throw new NotFoundException('Program not found');
      }

      if (file) {
        const image = await this.cloudinary.uploadImage(file);
        updateProgramDto.file = image.secure_url; // Updating the image URL
      }

      // Merge the new data with existing data
      const updatedProgram = await this._programRepo.save({
        ...programToUpdate,
        ...updateProgramDto,
      });

      return updatedProgram;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('This gym must appear for one gerant');
      }
      throw error; // Ensure to rethrow the error if it is not handled above
    }
  }

  async remove(id: string) {
    return await this._programRepo.delete(id);
  }
}