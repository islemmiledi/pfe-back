import { Module } from '@nestjs/common';
import { OffreService } from './offre.service';
import { OffreController } from './offre.controller';
import { Offre } from './entities/offre.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Offre])],

  controllers: [OffreController],
  providers: [OffreService],
})
export class OffreModule {}
