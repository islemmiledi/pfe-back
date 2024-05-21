import { ConflictException, Injectable } from '@nestjs/common';
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
    @InjectRepository(Membre) private readonly membreRepo: Repository<Membre>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(
    createMembreDto: CreateMembreDto,
    createUserDto: CreateUserDto,
  ): Promise<Membre> {
    // Vérification de l'existence du membre
    const existingMembre = await this.membreRepo.findOne({
      where: { Nom: createMembreDto.Nom },
    });

    if (existingMembre) {
      throw new ConflictException('Nom already exists');
    }

    // Création de l'utilisateur
    const newUser = this.userRepo.create(createUserDto);

    // Hashage du mot de passe
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);
    newUser.password = hash;

    // Sauvegarde de l'utilisateur
    const savedUser = await this.userRepo.save(newUser);

    // Création du membre
    const newMembre = this.membreRepo.create({
      ...createMembreDto,
      user: savedUser,
    });

    // Sauvegarde du membre
    return await this.membreRepo.save(newMembre);
  }

  async findAll(user: User): Promise<Membre[]> {
    return await this.membreRepo.find({});
  }

  async findOne(id: string): Promise<Membre> {
    return await this.membreRepo.findOneBy({ id });
  }

  async update(id: string, updateMembreDto: UpdateMembreDto): Promise<void> {
    await this.membreRepo.update(id, updateMembreDto);
  }

  async remove(id: string): Promise<void> {
    await this.membreRepo.delete(id);
  }
}
