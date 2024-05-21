import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Aboutus } from './entities/about-us.entity';
import { AboutusController } from './about-us.controller';
import { AboutusService } from './about-us.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Aboutus])],
  controllers: [AboutusController],
  providers: [AboutusService, CloudinaryService],
})
export class AboutusModule {}
