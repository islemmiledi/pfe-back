import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { Salle } from 'src/Modules/salle/entities/salle.entity';

export class CreateProduitDto {
  @IsNotEmpty()
  @IsString()
  Nomproduit: string;

  @IsNotEmpty()
  @IsString()
  Description: string;

  @IsNotEmpty()
  Prix: number;

  @IsOptional()
  file: string; // Marqué comme optionnel et doit être une URL valide si fourni.

  @IsOptional()
  salle: Salle;

  // @IsNotEmpty()
  // @IsString()
  // Categorie: string;
}
