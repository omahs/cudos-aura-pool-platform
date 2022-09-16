import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Role } from '../../user/roles';

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;

      return user.role === role;
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
