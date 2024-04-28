import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdreDto } from './create-ordre.dto';

export class UpdateOrdreDto extends PartialType(CreateOrdreDto) {}
