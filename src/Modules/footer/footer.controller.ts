import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { FooterService } from './footer.service';
import { CreateFooterDto } from './dto/create-footer.dto';
import { UpdateFooterDto } from './dto/update-footer.dto';

@Controller('footer')
export class FooterController {
  constructor(private readonly footerService: FooterService) {} // Correction ici

  @Post('/create')
  async create(@Body() createFooterDto: CreateFooterDto) {
    return await this.footerService.create(createFooterDto); // Correction ici
  }

  @Get('/footer')
  async findAll() {
    return await this.footerService.findAll(); // Correction ici
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.footerService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFooterDto: UpdateFooterDto,
  ) {
    return await this.footerService.update(id, updateFooterDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.footerService.remove(+id);
  }
}
