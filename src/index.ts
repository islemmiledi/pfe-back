import { SalleModule } from './Modules/salle/salle.module';
import { UserModule } from './Modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { MembreModule } from './Modules/membre/membre.module';

import { CoachModule } from './Modules/coach/coach.module';
import { ProduitModule } from './modules/produit/produit.module';
import { OrdreModule } from './modules/ordre/ordre.module';
import { CloudinaryModule } from './Modules/cloudinary/cloudinary.module';
import { FooterModule } from './modules/footer/footer.module';
import { Aboutus } from './modules/aboutus/entities/aboutus.entity';

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
  Aboutus,
];
