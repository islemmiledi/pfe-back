import { Module } from '@nestjs/common';
import { CoachService } from './coach.service';
import { CoachController } from './coach.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coach } from './entities/coach.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Coach]), UserModule],
  controllers: [CoachController],
  providers: [CoachService, CloudinaryService],
})
export class CoachModule {}
