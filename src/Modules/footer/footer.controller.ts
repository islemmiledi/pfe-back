import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FooterService } from './footer.service';
import { CreateFooterDto } from './dto/create-footer.dto';
import { UpdateFooterDto } from './dto/update-footer.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from '../user/decorator/user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('footer')
export class FooterController {
  constructor(private readonly footerService: FooterService) {} // Correction ici

  @UseGuards(JwtGuard)
  @Post('/create')
  async create(
    @Body() createFooterDto: CreateFooterDto,
    @GetUser() user: User,
  ) {
    return await this.footerService.create(createFooterDto, user); // Correction ici
  }

  @UseGuards(JwtGuard)
  @Get('footer-user')
  async getFootersByUser(@GetUser() user: User) {
    return await this.footerService.getFootersByUser(user);
  }

  @Get('/footer')
  async findAll() {
    return await this.footerService.findAll(); // Correction ici
  }

  @Get('footer-salle')
  async getFootersBySalleId(@Query('salleId') salleId: string) {
    return await this.footerService.getFootersBySalleId(salleId);
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
    return this.footerService.remove(id); // Correction ici
  }
}
