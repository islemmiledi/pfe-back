import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TypeAbonnement } from '../enum/abonnement.enum';
import { Program } from 'src/Modules/program/entities/program.entity';

export class CreateSalleDto {
  @IsString()
  @IsNotEmpty()
  Nom: string;

  // @IsNotEmpty()
  // Caracteristiques: string[];

  // @IsEnum(TypeAbonnement, { message: 'Invalid type' })
  // Typeabonnement: TypeAbonnement;

  // @IsNotEmpty()
  // websites: string;
  @IsString()
  @IsOptional()
  file: string; // Assuming this might be optional and a string path or URL

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  titre: string;

  // @IsString()
  // @IsNotEmpty()
  // aboutTitre: string;

  // @IsString()
  // @IsNotEmpty()
  // aboutDescription: string;
}
