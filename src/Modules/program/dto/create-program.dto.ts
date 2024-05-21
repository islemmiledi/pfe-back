import {
  IsString,
  IsNotEmpty,
  IsJSON,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { Salle } from 'src/Modules/salle/entities/salle.entity';

export class CreateProgramDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @IsOptional()
  file: string;

  @IsOptional()
  salle: Salle;
}
