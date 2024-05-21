import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Node } from 'src/common/node.entity';
import { Salle } from 'src/Modules/salle/entities/salle.entity';
import { User } from 'src/Modules/user/entities/user.entity';

@Entity('offres')
export class Offre extends Node {
  @Column({ type: 'varchar', length: 255 })
  typeoffre: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  prix: number;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Salle, (salle) => salle.offres, { eager: false })
  salle: Salle;

  @JoinColumn() // specify the name of the column in the junction tableColumn()
  salleId: string;

  @ManyToOne(() => User, (user) => user.offres, {
    eager: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  userId: string;
}
