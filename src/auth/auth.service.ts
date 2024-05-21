import { Injectable } from '@nestjs/common';
import { UserService } from 'src/Modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/Modules/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneWithUserName(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    // Le type devrait être plus spécifique que 'any' si possible
    const payload = {
      email: user.email,
      sub: { id: user.id, email: user.email, role: user.role },
    };
    return {
      success: true,
      role: user.role,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(user: User) {
    // Le type devrait être plus spécifique que 'any' si possible
    const payload = {
      email: user.email,
      sub: { id: user.id, email: user.email, role: user.role },
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
