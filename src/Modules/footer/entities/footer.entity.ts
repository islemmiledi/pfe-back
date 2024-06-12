import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Node } from 'src/common/node.entity';
import { Salle } from 'src/Modules/salle/entities/salle.entity';
import { User } from 'src/Modules/user/entities/user.entity';

@Entity()
export class Footer extends Node {
  @Column({ length: 200 })
  Adresse: string;

  @Column({ length: 20 })
  NumerodeTelephone: string;

  @Column({ type: 'text' })
  TempsDeTravail: string;

  @ManyToOne(() => Salle, (salle) => salle.footers, { eager: false })
  salle: Salle;

  @JoinColumn() // specify the name of the column in the junction tableColumn()
  salleId: string;

  @ManyToOne(() => User, (user) => user.footers, {
    eager: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  userId: string;
}
