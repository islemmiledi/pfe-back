import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Program } from 'src/Modules/program/entities/program.entity';
import { TypeTheme } from '../enum/type.enum';

export class CreateSalleDto {
  @IsString()
  @IsNotEmpty()
  Nom: string;

  // @IsNotEmpty()
  // Caracteristiques: string[];

  @IsEnum(TypeTheme, { message: 'Invalid type' })
  Typetheme: TypeTheme;

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
