// import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

// export class CreateFooterDto {
//   @IsString()
//   @IsNotEmpty()
//   @MaxLength(200)
//   Adresse: string;

//   @IsString()
//   @IsNotEmpty()
//   @MaxLength(20)
//   NumerodeTelephone: string;

//   @IsString()
//   @IsNotEmpty()
//   @MaxLength(100)
//   TempsDeTravail: string;
// }
import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

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
  @MaxLength(50)
  JourDebut: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  JourFin: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  HeureDebut: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  HeureFin: string;
}
