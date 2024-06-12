import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Repository } from 'typeorm';
import { Produit } from './entities/produit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(Produit)
    private readonly _produitRepo: Repository<Produit>,
    private cloudinary: CloudinaryService,
  ) {}
  async create(
    createProduitDto: CreateProduitDto,
    file: Express.Multer.File,
    user: User,
  ) {
    const image = await this.cloudinary.uploadImage(file);

    try {
      const existingProduit = await this._produitRepo.findOne({
        where: { Nomproduit: createProduitDto.Nomproduit },
      });

      if (existingProduit) {
        throw new ConflictException('Nom already exists');
      }

      // const image = await this.cloudinary.uploadImage(file);

      const newProduit = await this._produitRepo.save({
        ...createProduitDto,
        file: image.secure_url,
        user,

        // file: image.secure_url,
      });

      return newProduit; // Ensure this is being returned
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('This gym must appear for one gerant');
      }
      throw error; // Make sure to rethrow the error if not handled
    }
  }

  async findAll(): Promise<Produit[]> {
    return await this._produitRepo.find();
  }

  async getProduitsByUser(user: User) {
    return await this._produitRepo.find({
      where: { userId: user.id },
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Produit> {
    return await this._produitRepo.findOneBy({ id: id });
  }

  async update(
    id: string,
    file: Express.Multer.File,
    updateProduitDto: UpdateProduitDto,
  ) {
    const image = await this.cloudinary.uploadImage(file);

    return await this._produitRepo.update(id, {
      ...updateProduitDto,
      file: image.secure_url,
    });
  }

  async remove(id: string) {
    return await this._produitRepo.delete(id);
  }
}
