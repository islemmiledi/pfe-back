import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from 'src/Modules/user/enum/user.enum';

export const Roles = (...roles: UserRoles[]) => SetMetadata('roles', roles);
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRoles[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No roles specified, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming user information is attached to the request
     console.log(user);
    if (!user || !user.user.role) {
     
      return false; // If user or user.role is not available, deny access
    }

    return requiredRoles.includes(user.user.role);
  }
}
