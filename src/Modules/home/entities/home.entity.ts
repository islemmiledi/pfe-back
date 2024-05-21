import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Node } from 'src/common/node.entity'; // Assuming Node includes common ID setup
import { User } from 'src/Modules/user/entities/user.entity';
import { Salle } from 'src/Modules/salle/entities/salle.entity';

@Entity('home')
export class Home extends Node {
  @Column({ length: 255 })
  title: string;

  @Column('text')
  description: string;

  @Column({ default: '' })
  file: string;

  @ManyToOne(() => Salle, (salle) => salle.homes, { eager: false })
  salle: Salle;

  @JoinColumn() // specify the name of the column in the junction tableColumn()
  salleId: string;

  @ManyToOne(() => User, (user) => user.homes, {
    eager: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  userId: string;
}
