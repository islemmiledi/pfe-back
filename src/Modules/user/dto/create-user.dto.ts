import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRoles } from '../enum/user.enum';
import { IsIn } from 'class-validator';
import { Salle } from 'src/Modules/salle/entities/salle.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRoles, { message: 'Invalid role' })
  role: UserRoles;

  @IsOptional()
  salle: Salle;

  @IsOptional()
  file: string;
}
