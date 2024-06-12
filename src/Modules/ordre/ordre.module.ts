import { Module } from '@nestjs/common';
import { OrdreService } from './ordre.service';
import { OrdreController } from './ordre.controller';
import { Ordre } from './entities/ordre.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrdre } from './entities/userordre.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ordre, UserOrdre])],
  controllers: [OrdreController],
  providers: [OrdreService],
})
export class OrdreModule {}
