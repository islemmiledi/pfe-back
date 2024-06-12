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
export class Program extends Node {
  @Column({ length: 100 })
  title: string;

  @Column({ length: 255 })
  description: string;

  @Column({ default: '' })
  file: string;

  @ManyToOne(() => Salle, (salle) => salle.program, { eager: false })
  salle: Salle;

  @JoinColumn() // specify the name of the column in the junction tableColumn()
  salleId: string;

  @ManyToOne(() => User, (user) => user.programs, {
    eager: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  userId: string;
}
