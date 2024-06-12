import { Node } from 'src/common/node.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Program } from 'src/Modules/program/entities/program.entity';
import { Coach } from 'src/Modules/coach/entities/coach.entity';
import { Offre } from 'src/Modules/offre/entities/offre.entity';
import { Footer } from 'src/modules/footer/entities/footer.entity';
import { Aboutus } from 'src/Modules/about-us/entities/about-us.entity';
import { Home } from 'src/Modules/home/entities/home.entity';
import { TypeTheme } from '../enum/type.enum';
import { Produit } from 'src/modules/produit/entities/produit.entity';

@Entity()
export class Salle extends Node {
  @Column()
  Nom: string;

  @Column({
    type: 'enum',
    enum: TypeTheme,
    nullable: true,
  })
  Typetheme: TypeTheme;

  // @Column('simple-array') //t7ot 7aja tochrot bech tet7at 7aja kif me theb number alphab
  // Caracteristiques: string[];

  // @Column('longtext')
  // websites: string;

  @Column({ default: '' })
  file: string;

  @Column('text')
  description: string;

  @Column('varchar', { length: 255 })
  titre: string;

  @OneToMany(() => Program, (program) => program.salle, {
    eager: false,
  })
  program: Program[];

  @OneToMany(() => Coach, (coachs) => coachs.salle, {
    eager: false,
  })
  coachs: Coach[];

  @OneToMany(() => Offre, (offres) => offres.salle, {
    eager: false,
  })
  offres: Offre[];

  @OneToMany(() => Footer, (footers) => footers.salle, {
    eager: false,
  })
  footers: Footer[];

  @OneToMany(() => Aboutus, (aboutuss) => aboutuss.salle, {
    eager: false,
  })
  aboutuss: Aboutus[];

  @OneToMany(() => Home, (homes) => homes.salle, {
    eager: false,
  })
  homes: Home[];

  @OneToMany(() => Produit, (produits) => produits.salle, {
    eager: false,
  })
  produits: Produit[];
}
