import { Module } from '@nestjs/common';
import { MembreService } from './membre.service';
import { MembreController } from './membre.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membre } from './entities/membre.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Membre, User])],

  controllers: [MembreController],
  providers: [MembreService],
})
export class MembreModule {}
