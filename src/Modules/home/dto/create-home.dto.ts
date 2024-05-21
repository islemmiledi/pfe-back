import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { Salle } from 'src/Modules/salle/entities/salle.entity';

export class CreateHomeDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;

  @IsOptional()
  file: string;
  @IsOptional()
  salle: Salle;
}
