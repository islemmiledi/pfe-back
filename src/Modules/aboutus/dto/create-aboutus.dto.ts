import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateAboutusDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  Title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  Image: string;

  @IsString()
  @IsNotEmpty()
  Description: string;
}
