import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Node } from 'src/common/node.entity';

@Entity('produit')
export class Produit extends Node {
  @Column({ length: 100 })
  Nomproduit: string;

  @Column('text')
  Description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  Prix: number;

  @Column({ nullable: true })
  Image?: string;

  @Column({ length: 100 })
  Categorie: string;
}
