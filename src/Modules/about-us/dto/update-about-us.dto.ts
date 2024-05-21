import { PartialType } from '@nestjs/mapped-types';
import { CreateAboutusDto } from './create-about-us.dto';

export class UpdateAboutUsDto extends PartialType(CreateAboutusDto) {}
