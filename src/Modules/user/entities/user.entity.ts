import { Node } from 'src/common/node.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserRoles } from '../enum/user.enum';
import { Salle } from 'src/Modules/salle/entities/salle.entity';
import { Coach } from 'src/Modules/coach/entities/coach.entity';
import { Membre } from 'src/Modules/membre/entities/membre.entity';
import { Program } from 'src/Modules/program/entities/program.entity';
import { Offre } from 'src/Modules/offre/entities/offre.entity';
import { Aboutus } from 'src/Modules/about-us/entities/about-us.entity';
import { Footer } from 'src/modules/footer/entities/footer.entity';
import { Home } from 'src/Modules/home/entities/home.entity';
import { Produit } from 'src/modules/produit/entities/produit.entity';

@Entity()
export class User extends Node {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: false }) //t7ot 7aja tochrot bech tet7at 7aja kif me theb number alphab
  isGold: boolean;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'enum', enum: UserRoles, nullable: true })
  role: UserRoles;

  @Column({ default: '' })
  file: string;

  @OneToOne(() => Salle, { cascade: true })
  @JoinColumn()
  salle: Salle;

  @OneToMany(() => Coach, (coachs) => coachs.user, {
    eager: false,
    cascade: true,
  })
  coachs: Coach[];
  @OneToMany(() => Program, (programs) => programs.user, {
    eager: false,
    cascade: true,
  })
  programs: Program[];

  @OneToMany(() => Offre, (offres) => offres.user, {
    eager: false,
    cascade: true,
  })
  offres: Offre[];

  @OneToMany(() => Aboutus, (aboutuss) => aboutuss.user, {
    eager: false,
    cascade: true,
  })
  aboutuss: Footer[];

  @OneToMany(() => Footer, (footers) => footers.user, {
    eager: false,
    cascade: true,
  })
  footers: Footer[];

  @OneToMany(() => Home, (homes) => homes.user, {
    eager: false,
    cascade: true,
  })
  homes: Home[];

  @OneToMany(() => Produit, (produits) => produits.user, {
    eager: false,
    cascade: true,
  })
  produits: Produit[];
  //permettant d'associer chaque utilisateur à une salle unique dans votre base de données
  // @OneToMany(() => Membre, (membres) => membres.user, {
  //   eager: false,
  // })
  // membres: Membre[];
}
