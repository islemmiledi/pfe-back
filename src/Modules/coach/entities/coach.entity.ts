import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Node } from 'src/common/node.entity';

@Entity('coachs') // Assurez-vous que 'coatchs' est le nom correct de la table.
export class Coach extends Node {
  @Column({ length: 100 })
  Nom: string; // Nom du coach

  @Column({ length: 100 })
  Specialite: string; // Spécialité du coach

  @Column({ type: 'text' })
  Description: string; // Description du coach

  @Column({ default: '' })
  file: string;
}
