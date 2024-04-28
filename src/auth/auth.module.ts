import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/Modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';

import { LocalStrategy } from './strategies/local-strategy';
import { UserService } from 'src/Modules/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Modules/user/entities/user.entity';
import { JwtStrategy } from './strategies/jwt-strategy';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { CloudinaryService } from 'src/Modules/cloudinary/cloudinary.service';
import { EmailService } from 'src/Modules/mailer/mailer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`, // Assurez-vous que la variable d'environnement est définie
      signOptions: { expiresIn: '5d' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserService,
    RefreshJwtStrategy,
    CloudinaryService,
    EmailService,
  ], // Supprimez le doublon UserService
  controllers: [AuthController],
})
export class AuthModule {}
