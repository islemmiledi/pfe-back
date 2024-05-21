import { SalleModule } from './Modules/salle/salle.module';
import { UserModule } from './Modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { MembreModule } from './Modules/membre/membre.module';

import { CoachModule } from './Modules/coach/coach.module';
import { ProduitModule } from './modules/produit/produit.module';
import { OrdreModule } from './modules/ordre/ordre.module';
import { CloudinaryModule } from './Modules/cloudinary/cloudinary.module';
import { FooterModule } from './modules/footer/footer.module';
import { AboutusModule } from './Modules/about-us/about-us.module';
import { ProgramModule } from './Modules/program/program.module';
import { OffreModule } from './Modules/offre/offre.module';
import { HomeModule } from './Modules/home/home.module';

export const allModules = [
  UserModule,
  AuthModule,
  SalleModule,
  MembreModule,
  CoachModule,
  ProduitModule,
  OrdreModule,
  CloudinaryModule,
  FooterModule,
  AboutusModule,
  ProgramModule,
  OffreModule,
  HomeModule,
];
