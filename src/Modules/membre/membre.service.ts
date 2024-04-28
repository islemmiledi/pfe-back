import { Injectable } from '@nestjs/common';
import { CreateMembreDto } from './dto/create-membre.dto';
import { UpdateMembreDto } from './dto/update-membre.dto';
import { Membre } from './entities/membre.entity'; // Assurez-vous que le chemin est correct

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MembreService {
  constructor(
    @InjectRepository(Membre) private readonly _membreRepo: Repository<Membre>,
    @InjectRepository(User) private readonly _userRepo: Repository<User>,
  ) {}

  async create(createMembreDto: CreateMembreDto, createUserDto: CreateUserDto) {
    const newUser = await this._userRepo.create(createUserDto);
    // Hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = createUserDto.password;
    const hash = await bcrypt.hash(passwordHash, salt);

    // Save user
    hash && (newUser.password = hash);
    const savedUser = await this._userRepo.save(newUser);

    const newMembre = await this._membreRepo.create({
      user: savedUser,
      ...createMembreDto,
    });
    return await this._membreRepo.save(newMembre);
  }

  async findAll(): Promise<Membre[]> {
    return await this._membreRepo.find();
  }

  async findOne(id: string): Promise<Membre> {
    return await this._membreRepo.findOneBy({ id: id });
  }

  async update(id: string, updateMembreDto: UpdateMembreDto) {
    return await this._membreRepo.update(id, updateMembreDto);
  }

  async remove(id: string) {
    return await this._membreRepo.delete(id);
  }
}
