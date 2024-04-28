import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Sexe } from '../enum/sexe.enum';
import { Node } from 'src/common/node.entity';
import { User } from 'src/Modules/user/entities/user.entity';

@Entity('membres')
export class Membre extends Node {
  @Column()
  Nom: string;

  @Column({ type: 'date' })
  Datedenaissance: Date;

  @Column({ type: 'enum', enum: Sexe })
  Sexe: Sexe;

  @Column({ length: 255 })
  Adresse: string;

  @Column()
  Numerodetelephone: string;

  @CreateDateColumn({ type: 'timestamp' })
  Dateinscription: Date;

  @Column({ length: 100 })
  Typeabonnement: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
