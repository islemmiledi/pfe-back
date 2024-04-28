import { Node } from 'src/common/node.entity';
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserRoles } from '../enum/user.enum';
import { Salle } from 'src/Modules/salle/entities/salle.entity';

@Entity()
export class User extends Node {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true }) //t7ot 7aja tochrot bech tet7at 7aja kif me theb number alphab
  isActive: boolean;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'enum', enum: UserRoles, nullable: true })
  role: UserRoles;

  @Column({ default: '' })
  file: string;

  @OneToOne(() => Salle)
  @JoinColumn()
  salle: Salle; //permettant d'associer chaque utilisateur à une salle unique dans votre base de données
}
