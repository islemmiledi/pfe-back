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

  @ManyToOne(() => User, (user) => user.coachs, {
    eager: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Salle, (salle) => salle.coachs, { eager: false })
  salle: Salle;

  @JoinColumn() // specify the name of the column in the junction tableColumn()
  salleId: string;
}
