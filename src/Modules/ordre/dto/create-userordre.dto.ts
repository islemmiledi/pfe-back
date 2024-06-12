import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateOrdreDto } from './create-ordre.dto';

class UserDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  prénom: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  adrlivraison: string;

  @IsString()
  @IsNotEmpty()
  numtl: string;

  @IsString()
  @IsNotEmpty()
  salleId: string;
}

export class CreateUserOrdreDto {
  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;

  @ValidateNested({ each: true })
  @Type(() => CreateOrdreDto)
  order: CreateOrdreDto[];
}
