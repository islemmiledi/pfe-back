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
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  product: string;
}
