import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdreService } from './ordre.service';
import { CreateOrdreDto } from './dto/create-ordre.dto';
import { UpdateOrdreDto } from './dto/update-ordre.dto';
import { CreateUserOrdreDto } from './dto/create-userordre.dto';

@Controller('ordre')
export class OrdreController {
  constructor(private readonly ordreService: OrdreService) {}

  @Post('/create')
  async create(@Body() createUserDto: CreateUserOrdreDto) {
    return this.ordreService.create(createUserDto);
  }

  @Get('/ordres')
  async findAllUsersOrders() {
    return this.ordreService.findAllUsersOrders();
  }
}
