import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import RequestWithUser from '../../auth/interfaces/requestWithUser.interface';
import { Farm } from '../farm.model';
import { FarmService } from '../farm.service';

@Injectable()
export class IsCreatorGuard extends JwtAuthGuard implements CanActivate {
    constructor(private farmService: FarmService) {
        super();
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<RequestWithUser>();
        const { user, params } = request;

        if (!user || !params) return false;

        const userId = user.id;
        const farmId = parseInt(params.id);

        return this.farmService
            .findOne(farmId)
            .then((farm: Farm) => farm.creator_id === userId);
    }
}
