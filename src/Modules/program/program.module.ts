import { Module } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Program])],

  controllers: [ProgramController],
  providers: [ProgramService, CloudinaryService],
})
export class ProgramModule {}
