import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserOrdre } from './entities/userordre.entity';
import { Ordre } from './entities/ordre.entity';
import { CreateUserOrdreDto } from './dto/create-userordre.dto';

@Injectable()
export class OrdreService {
  constructor(
    @InjectRepository(UserOrdre)
    private userRepository: Repository<UserOrdre>,

    @InjectRepository(Ordre)
    private ordreRepository: Repository<Ordre>,
  ) {}

  async create(createUserDto: CreateUserOrdreDto) {
    const { user, order } = createUserDto;
    const newUser = this.userRepository.create(user);
    const savedUser = await this.userRepository.save(newUser);

    const orders =
      order &&
      order.map((orderData) => {
        const newOrder = this.ordreRepository.create(orderData);
        newOrder.userordre = savedUser;

        return newOrder;
      });

    await this.ordreRepository.save(orders);

    return savedUser;
  }

  async findAllUsersOrders() {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.ordres', 'order')
      .getMany();
  }
}
