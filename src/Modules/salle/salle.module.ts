import { Module } from '@nestjs/common';
import { SalleService } from './salle.service';
import { SalleController } from './salle.controller';
import { Salle } from './entities/salle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Salle])],
  controllers: [SalleController],
  providers: [SalleService, CloudinaryService],
})
export class SalleModule {}
