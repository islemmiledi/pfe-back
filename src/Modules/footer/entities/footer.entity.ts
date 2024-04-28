import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Node } from 'src/common/node.entity';

// @Entity('footers')
// export class Footer extends Node {
//   @Column({ length: 200 })
//   Adresse: string;

//   @Column({ length: 20 })
//   NumerodeTelephone: string;

//   @Column({ length: 100 })
//   TempsDeTravail: string;
// }
@Entity('footers')
export class Footer extends Node {
  @Column({ length: 200 })
  Adresse: string;

  @Column({ length: 20 })
  NumerodeTelephone: string;

  @Column({ length: 50 })
  JourDebut: string;

  @Column({ length: 50 })
  JourFin: string;

  @Column({ type: 'time' })
  HeureDebut: string;

  @Column({ type: 'time' })
  HeureFin: string;
}
