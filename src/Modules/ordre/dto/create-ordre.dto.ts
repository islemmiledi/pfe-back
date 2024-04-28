import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  Min,
  IsUrl,
} from 'class-validator';

export class CreateOrdreDto {
  @IsNotEmpty()
  @IsString()
  Adressemembre: string;

  @IsNotEmpty()
  @IsString()
  Ville: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  Numdetelephone: string;

  @IsNotEmpty()
  @IsString()
  Codepostal: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  Prixtotal: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  Quantite: number;

  @IsOptional()
  @IsUrl()
  Image?: string;
}
