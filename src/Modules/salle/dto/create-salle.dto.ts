import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TypeAbonnement } from '../enum/abonnement.enum';

export class CreateSalleDto {
  @IsString()
  @IsNotEmpty()
  Nom: string;

  @IsNotEmpty()
  Caracteristiques: string[];

  @IsEnum(TypeAbonnement, { message: 'Invalid type' })
  Typeabonnement: TypeAbonnement;
}
