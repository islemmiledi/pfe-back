import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Node } from 'src/common/node.entity';
import { User } from 'src/Modules/user/entities/user.entity';
import { Salle } from 'src/Modules/salle/entities/salle.entity';

@Entity()
export class Produit extends Node {
  @Column({ length: 100 })
  Nomproduit: string;

  @Column('text')
  Description: string;

  @Column({ default: 0 })
  Prix: number;

  @Column({ default: '' })
  file: string;

  @ManyToOne(() => User, (user) => user.produits, {
    eager: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Salle, (salle) => salle.produits, { eager: false })
  salle: Salle;

  @JoinColumn() // specify the name of the column in the junction tableColumn()
  salleId: string;

  // @Column({ length: 100 })
  // Categorie: string;
}
