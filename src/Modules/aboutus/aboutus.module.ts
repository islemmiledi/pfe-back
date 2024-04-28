import { Module } from '@nestjs/common';
import { AboutusService } from './aboutus.service';
import { AboutusController } from './aboutus.controller';
import { Aboutus } from './entities/aboutus.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Aboutus])],
  controllers: [AboutusController],
  providers: [AboutusService],
})
export class AboutusModule {}
