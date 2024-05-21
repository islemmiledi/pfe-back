import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Home } from './entities/home.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Home])],
  controllers: [HomeController],
  providers: [HomeService, CloudinaryService],
})
export class HomeModule {}
