import {
  IsString,
  IsNotEmpty,
  IsJSON,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { Salle } from 'src/Modules/salle/entities/salle.entity';

export class CreateAboutusDto {
  @IsString()
  @IsNotEmpty()
  communityHighlight: string;

  @IsString()
  @IsNotEmpty()
  valueProposition: string;

  @IsOptional()
  file: string;

  @IsOptional()
  salle: Salle;
}
