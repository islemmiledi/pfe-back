import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { EmailService } from '../mailer/mailer.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly _userRepo: Repository<User>,
    private cloudinary: CloudinaryService,
    private readonly emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto, file: Express.Multer.File) {
    try {
      // Check if the  already exists
      const existingUser = await this._userRepo.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const image = await this.cloudinary.uploadImage(file);

      const user = await this._userRepo.create({
        ...createUserDto,
        file: image.secure_url,
      });
      await this.emailService.sendRegistrationEmail(
        createUserDto.email,
        createUserDto.password,
      );
      // Hash password
      const salt = await bcrypt.genSalt();
      const passwordHash = createUserDto.password;
      const hash = await bcrypt.hash(passwordHash, salt);

      // Save user
      hash && (user.password = hash);
      await this._userRepo.save(user);

      //For not return the password in the response
      const { password, ...result } = user;
      return result;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('this gym mast appear for one gerant');
      }
    }
  }

  async findOneWithUserName(email: string) {
    try {
      return await this._userRepo.findOne({ where: { email: email } });
    } catch (error) {
      console.error('Error finding user:', error);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async findOneWithId(user: User) {
    try {
      const userone = await this._userRepo
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.salle', 'salle')
        .select(['user', 'salle.id']) // Select all fields from user, only id from salle
        .where('user.id = :id', { id: user.id })
        .getOne();
      delete userone.password;
      return userone;
    } catch (error) {
      console.error('Error finding user:', error);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async findAll(salle: string) {
    const users = await this._userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.salle', salle) // tna7i les att fi west salle(and select)
      .getMany();
    // .where()
    // .getOne();
    users.map((user) => {
      delete user.password;
    });
    return users;
  }

  async findAllWithPagination(page: number, user: User) {
    const ITEMS_PER_PAGE = 8;
    const skip = (page - 1) * ITEMS_PER_PAGE;

    // Fetching users with pagination
    const users = await this._userRepo.find({
      skip: skip,
      take: ITEMS_PER_PAGE,
      where: { id: Not(user.id) },
      relations: ['salle'],
    });

    // Cleaning up user data (e.g., removing passwords)
    users.map((user) => {
      delete user.password;
      return user;
    });

    // Counting total number of users
    const totalUsers = await this._userRepo.count({
      where: { id: Not(user.id) },
    });

    // Calculating total pages
    const totalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE);

    return {
      users,
      totalUsers,
      totalPages,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this._userRepo.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this._userRepo.delete(id);
  }
}
