import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Node } from 'src/common/node.entity';
import { UserOrdre } from './userordre.entity';

@Entity() // Le nom 'ordres' est le nom de la table dans votre base de données
export class Ordre extends Node {
  @Column({ length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column({ default: 0 })
  total: number;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  quantity: number;

  @Column({ default: '' })
  image: string;

  @Column({ default: '' })
  product: string;

  @ManyToOne(() => UserOrdre, (user) => user.ordres)
  userordre: UserOrdre;
}
