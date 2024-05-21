import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { Salle } from 'src/Modules/salle/entities/salle.entity';

export class CreateCoachDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  Nom: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  Specialite: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  Description: string;
  @IsOptional()
  file: string;

  @IsOptional()
  salle: Salle;
}
