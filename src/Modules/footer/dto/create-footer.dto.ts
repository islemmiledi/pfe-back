import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { Salle } from 'src/Modules/salle/entities/salle.entity';

export class CreateFooterDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  Adresse: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  NumerodeTelephone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  TempsDeTravail: string;

  @IsOptional()
  salle: Salle;
}
