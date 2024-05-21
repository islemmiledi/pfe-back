import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { allModules } from 'src';
import { User } from './Modules/user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ProduitModule } from './modules/produit/produit.module';
import { OrdreModule } from './modules/ordre/ordre.module';
import { FooterModule } from './modules/footer/footer.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AboutusModule } from './Modules/about-us/about-us.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'fitnessp',
      entities: [__dirname + 'entities/**/*.entity.{js,ts}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: '1dc80091041aea',
          pass: '1612b7ffbaa5e4',
        },
      },
    }),
    ...allModules,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
