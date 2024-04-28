import { Node } from 'src/common/node.entity';
import { Column, Entity } from 'typeorm';
import { TypeAbonnement } from '../enum/abonnement.enum';

@Entity()
export class Salle extends Node {
  @Column()
  Nom: string;

  @Column({ type: 'enum', enum: TypeAbonnement, nullable: true })
  Typeabonnement: TypeAbonnement;

  @Column('simple-array') //t7ot 7aja tochrot bech tet7at 7aja kif me theb number alphab
  Caracteristiques: string[];
}
