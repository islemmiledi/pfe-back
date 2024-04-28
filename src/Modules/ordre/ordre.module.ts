import { Module } from '@nestjs/common';
import { OrdreService } from './ordre.service';
import { OrdreController } from './ordre.controller';
import { Ordre } from './entities/ordre.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ordre])],
  controllers: [OrdreController],
  providers: [OrdreService],
})
export class OrdreModule {}
