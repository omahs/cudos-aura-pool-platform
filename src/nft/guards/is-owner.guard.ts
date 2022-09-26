import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import RequestWithUser from '../../auth/interfaces/requestWithUser.interface';
import { NFT } from '../nft.model';
import { NFTService } from '../nft.service';

@Injectable()
export class IsOwnerGuard extends JwtAuthGuard implements CanActivate {
  constructor(private nftService: NFTService) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const { user, params } = request;

    if (!user || !params) return false;

    const userId = user.id;
    const nftId = parseInt(params.id);

    return this.nftService
      .findOne(nftId)
      .then((nft: NFT) => nft.owner_id === userId);
  }
}
