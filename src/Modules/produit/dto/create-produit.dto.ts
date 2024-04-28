import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateProduitDto {
  @IsNotEmpty()
  @IsString()
  Nomproduit: string;

  @IsNotEmpty()
  @IsString()
  Description: string;

  @IsNotEmpty()
  @IsNumber()
  Prix: number;

  @IsOptional()
  @IsUrl()
  Image?: string; // Marqué comme optionnel et doit être une URL valide si fourni.

  @IsNotEmpty()
  @IsString()
  Categorie: string;
}
