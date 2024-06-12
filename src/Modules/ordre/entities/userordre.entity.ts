// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Ordre } from './ordre.entity';
import { Node } from 'src/common/node.entity';

@Entity()
export class UserOrdre extends Node {
  @Column()
  nom: string;

  @Column()
  prénom: string;

  @Column()
  email: string;

  @Column()
  adrlivraison: string;

  @Column()
  numtl: string;

  @Column()
  salleId: string;

  @OneToMany(() => Ordre, (ordre) => ordre.userordre)
  ordres: Ordre[];
}
