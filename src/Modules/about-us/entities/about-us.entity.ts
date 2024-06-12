import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Node } from 'src/common/node.entity';
import { Salle } from 'src/Modules/salle/entities/salle.entity';
import { User } from 'src/Modules/user/entities/user.entity';

@Entity()
export class Aboutus extends Node {
  @Column('text')
  communityHighlight: string;

  @Column('text')
  valueProposition: string;

  @Column({ default: '' })
  file: string;
  @ManyToOne(() => Salle, (salle) => salle.aboutuss, { eager: false })
  salle: Salle;

  @JoinColumn() // specify the name of the column in the junction tableColumn()
  salleId: string;

  @ManyToOne(() => User, (user) => user.aboutuss, {
    eager: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  userId: string;
}
