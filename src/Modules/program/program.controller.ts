import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ProgramService } from './program.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from '../user/decorator/user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @UseGuards(JwtGuard)
  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createProgramDto: CreateProgramDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
  ) {
    return await this.programService.create(createProgramDto, file, user);
  }

  @Get()
  findAll() {
    return this.programService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('program-user')
  async getProgramsByUser(@GetUser() user: User) {
    return await this.programService.getProgramsByUser(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programService.findOne(+id);
  }

  @Post(':id')
  @UseInterceptors(FileInterceptor('file')) // 'file' is the name of the field in the form-data where the file will be uploaded from
  async update(
    @Param('id') id: string,
    @Body() updateProgramDto: UpdateProgramDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.programService.update(id, file, updateProgramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programService.remove(id);
  }
}
