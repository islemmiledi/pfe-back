import {
  IsString,
  IsDecimal,
  IsNotEmpty,
  Length,
  IsOptional,
} from 'class-validator';
import { Salle } from 'src/Modules/salle/entities/salle.entity';

export class CreateOffreDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  typeoffre: string;

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '2' })
  prix: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  salle: Salle;
}
