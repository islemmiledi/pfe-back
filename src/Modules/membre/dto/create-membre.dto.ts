import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsDate,
  MinLength,
} from 'class-validator';
import { Sexe } from '../enum/sexe.enum';
import { Node } from 'src/common/node.entity';
import { Type } from 'class-transformer';

export class CreateMembreDto {
  @IsString()
  @IsNotEmpty()
  Nom: string;
  @IsDate()
  @Type(() => Date)
  Datedenaissance: Date;

  @IsEnum(Sexe, { message: 'Le sexe doit être Homme, Femme ou Autre' })
  Sexe: Sexe;

  @IsString()
  Adresse: string;

  @IsString()
  @IsNotEmpty()
  Numerodetelephone: string;

  @IsDate()
  @Type(() => Date)
  Dateinscription: Date;

  @IsString()
  Typeabonnement: string;
}
